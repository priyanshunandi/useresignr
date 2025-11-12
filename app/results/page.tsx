"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CircularProgress } from "@/components/circular-progress"
import { DownloadIcon, SaveIcon, RefreshCcwIcon } from "lucide-react"
import { RadarChart } from "@/components/radar-chart"
import type { JobAnalysisData } from "@/lib/types"
import { Header } from "@/components/header"
import ResultsOverview from "@/components/results-overview"
import RecommendationBanner from "@/components/recommendation-banner"
import ActionPlan from "@/components/action-plan"
import BurnoutRiskIndicator from "@/components/burnout-risk-indicator"
import ConsultationCTA from "@/components/consultation-cta"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const [analysisData, setAnalysisData] = useState<JobAnalysisData | null>(null)
  const [score, setScore] = useState(0)
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current && searchParams) {
      initialized.current = true
      const data: JobAnalysisData = {
        jobTitle: searchParams.get("jobTitle") || "",
        yearsOfExperience: Number(searchParams.get("yearsOfExperience")) || 0,
        currentSalary: Number(searchParams.get("currentSalary")) || 0,
        industrySalary: Number(searchParams.get("industrySalary")) || 0,
        qualification: searchParams.get("qualification") || "",
        skillsMatch: searchParams.get("skillsMatch") || "",
        betterSkillsOtherRole: searchParams.get("betterSkillsOtherRole") || "",
        incomeDependency: searchParams.get("incomeDependency") || "",
        growthOpportunities: Number(searchParams.get("growthOpportunities")) || 5,
        alignWithQualifications: searchParams.get("alignWithQualifications") || "",
        workLifeBalance: Number(searchParams.get("workLifeBalance")) || 5,
        mentalHealthImpact: Number(searchParams.get("mentalHealthImpact")) || 5,
        learningOpportunities: Number(searchParams.get("learningOpportunities")) || 5,
        promotionOutlook: searchParams.get("promotionOutlook") || "",
      }
      setAnalysisData(data)

      const calculatedScore = Math.round(
        (data.workLifeBalance +
          data.growthOpportunities +
          data.learningOpportunities +
          (10 - data.mentalHealthImpact)) /
          4,
      )
      setScore(calculatedScore)
    }
  }, [searchParams])

  if (!analysisData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#e6f0ff]">
        <p>Loading analysis...</p>
      </div>
    )
  }

  const salaryDifference =
    analysisData.industrySalary > 0
      ? ((analysisData.currentSalary - analysisData.industrySalary) / analysisData.industrySalary) * 100
      : 0

  return (
    <main className="min-h-screen bg-[#e6f0ff] p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <Header />

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-medium">Your Career Analysis</h2>
            <p className="text-sm text-gray-600">
              This analysis is meant as a guide to help you reflect on your career situation.
            </p>
          </div>

          <ResultsOverview data={analysisData} score={score} salaryDifferencePct={salaryDifference} />

          <div className="mb-8 flex justify-center">
            <CircularProgress value={score} maxValue={10} />
          </div>

          <RecommendationBanner data={analysisData} score={score} salaryDifferencePct={salaryDifference} />

          <BurnoutRiskIndicator data={analysisData} />

          <ConsultationCTA score={score} />

          <ActionPlan data={analysisData} score={score} salaryDifferencePct={salaryDifference} />

          <Accordion type="single" collapsible className="space-y-4" defaultValue="salary">
            <AccordionItem value="salary" className="border rounded-lg">
              <AccordionTrigger className="px-4">Salary Comparison</AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  <p className="text-sm font-medium text-red-500">
                    {salaryDifference.toFixed(1)}% below industry average
                  </p>
                  <div className="h-64">
                    <div className="flex h-full items-end justify-center space-x-16 px-8">
                      <div className="flex w-32 flex-col items-center">
                        <div className="relative w-full">
                          <div
                            className="w-full bg-gradient-to-b from-[#FF66EB] to-[#993D8D]"
                            style={{
                              height: `${
                                analysisData.industrySalary > 0
                                  ? Math.max(20, (analysisData.currentSalary / analysisData.industrySalary) * 100)
                                  : 20
                              }%`,
                              minHeight: "40px",
                            }}
                          />
                        </div>
                        <span className="mt-2 text-sm font-medium">Your Salary</span>
                        <span className="text-xs text-gray-500">
                          {analysisData.currentSalary.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                      <div className="flex w-32 flex-col items-center">
                        <div className="relative w-full">
                          <div
                            className="h-full w-full bg-gradient-to-b from-[#FF66EB] to-[#993D8D]"
                            style={{ minHeight: "200px" }}
                          />
                        </div>
                        <span className="mt-2 text-sm font-medium">Industry Avg</span>
                        <span className="text-xs text-gray-500">
                          {analysisData.industrySalary.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="satisfaction" className="border rounded-lg">
              <AccordionTrigger className="px-4">Career Satisfaction Factors</AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <RadarChart data={analysisData} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <RefreshCcwIcon className="h-4 w-4" />
                New Analysis
              </Button>
            </Link>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <DownloadIcon className="h-4 w-4" />
              Download PDF
            </Button>
            <Button className="flex items-center gap-2 bg-[#FF66EB] hover:bg-[#d452b9]">
              <SaveIcon className="h-4 w-4" />
              Save Your First Analysis
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          This tool is designed to help with career reflection, but the final decision is always yours.
        </div>
      </div>
    </main>
  )
}
