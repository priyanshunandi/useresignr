"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { JobAnalysisData } from "@/lib/types"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "@/components/ui/chart"

interface ResultsDisplayProps {
  data: JobAnalysisData
}

export default function ResultsDisplay({ data }: ResultsDisplayProps) {
  // Calculate salary percentage compared to industry average
  const salaryPercentage = data.industrySalary > 0 ? Math.round((data.currentSalary / data.industrySalary) * 100) : 0

  // Calculate overall score based on various factors (1-10 scale)
  const calculateOverallScore = () => {
    let score = 0
    score += data.growthOpportunities
    score += data.workLifeBalance
    score += data.learningOpportunities
    score += 10 - data.mentalHealthImpact // Invert mental health impact
    return Math.round(score / 4) // Average of all factors
  }

  const overallScore = calculateOverallScore()

  // Generate recommendation based on overall score
  const getRecommendation = () => {
    if (overallScore >= 8) {
      return "🌟 Your current position seems stable. Consider staying and growing in this role."
    } else if (overallScore >= 6) {
      return "👍 Your job has potential. Try addressing concerns with your manager."
    } else if (overallScore >= 4) {
      return "🤔 You might want to explore new opportunities, but quitting now may not be urgent."
    } else {
      return "⚠️ Consider actively looking for new opportunities."
    }
  }

  const salaryData = [
    {
      name: "Your Salary",
      value: data.currentSalary / 1000, // Convert to K
    },
    {
      name: "Industry Avg",
      value: data.industrySalary / 1000, // Convert to K
    },
  ]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Industry Outlook</p>
              <div className="bg-[#FF66EB]/20 p-3 rounded-lg">Stable</div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Annual Salary (INR):</p>
              <div className="bg-[#FF66EB]/20 p-3 rounded-lg">{data.currentSalary.toLocaleString()}</div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Industry Avg. Annual Salary (INR):</p>
              <div className="bg-[#FF66EB]/20 p-3 rounded-lg">{data.industrySalary.toLocaleString()}</div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Skill Match with Job:</p>
              <div className="bg-[#FF66EB]/20 p-3 rounded-lg">{data.skillsMatch}</div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Income Dependency on Current Job:</p>
              <div className="bg-[#FF66EB]/20 p-3 rounded-lg">{data.incomeDependency}</div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Financial Buffer:</p>
              <div className="bg-[#FF66EB]/20 p-3 rounded-lg">Yes</div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Company Growth (1-10): {data.growthOpportunities}</p>
              <Progress value={data.growthOpportunities * 10} className="bg-gray-200 h-2" />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Job Satisfaction (1-10): {data.learningOpportunities}</p>
              <Progress value={data.learningOpportunities * 10} className="bg-gray-200 h-2" />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Work-Life Balance (1-10): {data.workLifeBalance}</p>
              <Progress value={data.workLifeBalance * 10} className="bg-gray-200 h-2" />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Mental Health Impact (1-10): {data.mentalHealthImpact}</p>
              <Progress value={data.mentalHealthImpact * 10} className="bg-gray-200 h-2" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FF66EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center text-sm mt-2">Your Salary is {salaryPercentage}% Compared to Industry Avg.</p>
          </div>

          <Card className="bg-[#FF66EB]/20 border-none p-4">
            <p className="text-lg">{getRecommendation()}</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
