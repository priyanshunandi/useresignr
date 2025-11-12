"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRightIcon } from "lucide-react"
import type { JobAnalysisData } from "@/lib/types"
import { DynamicQuote } from "@/components/dynamic-quote"
import { SmoothSlider } from "@/components/smooth-slider"

export default function JobAnalysisForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<JobAnalysisData>({
    jobTitle: "",
    yearsOfExperience: 0,
    currentSalary: 0,
    industrySalary: 0,
    qualification: "",
    skillsMatch: "",
    betterSkillsOtherRole: "",
    incomeDependency: "",
    growthOpportunities: 5,
    alignWithQualifications: "",
    workLifeBalance: 5,
    mentalHealthImpact: 5,
    learningOpportunities: 5,
    promotionOutlook: "",
  })

  const handleChange = (field: keyof JobAnalysisData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => setCurrentStep((s) => Math.min(3, s + 1))
  const handlePrevStep = () => setCurrentStep((s) => Math.max(1, s - 1))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    Object.entries(formData).forEach(([key, value]) => params.append(key, String(value)))
    router.push(`/results?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Career Reflection Tool Header */}
      <div className="mb-6 rounded-lg bg-[#f8fbf0] p-4">
        <h2 className="mb-2 text-lg font-medium text-[#9c4dcc]">Career Reflection Tool</h2>
        <p className="text-sm text-gray-700">
          Making the decision to stay or leave a job is significant. This tool will help you analyze your current
          position objectively and provide insights to support your decision-making process.
        </p>
      </div>

      {/* Dynamic Quote */}
      <DynamicQuote />

      {/* Step Indicator */}
      <div className="mb-8 flex items-center justify-center">
        <div className="flex items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              currentStep > 1
                ? "bg-[#d452b9] text-white"
                : currentStep === 1
                  ? "bg-[#d452b9] text-white"
                  : "bg-gray-200 text-gray-500"
            }`}
          >
            {currentStep > 1 ? "✓" : "1"}
          </div>
          <div className="mx-2 h-1 w-16 bg-gray-200"></div>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              currentStep === 2 ? "bg-[#d452b9] text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>
          <div className="mx-2 h-1 w-16 bg-gray-200"></div>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              currentStep === 3 ? "bg-[#d452b9] text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            3
          </div>
        </div>
      </div>

      {currentStep === 1 && (
        <>
          <h2 className="mb-6 text-xl font-medium">Career Details</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                id="jobTitle"
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={(e) => handleChange("jobTitle", e.target.value)}
                required
                className="border-gray-400 bg-white text-gray-900 placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Input
                id="yearsOfExperience"
                placeholder="Years of Experience"
                type="number"
                min="0"
                value={formData.yearsOfExperience || ""}
                onChange={(e) => handleChange("yearsOfExperience", Number(e.target.value))}
                required
                className="border-gray-400 bg-white text-gray-900 placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Input
                id="currentSalary"
                placeholder="Current Salary"
                type="number"
                min="0"
                value={formData.currentSalary || ""}
                onChange={(e) => handleChange("currentSalary", Number(e.target.value))}
                required
                className="border-gray-400 bg-white text-gray-900 placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Input
                id="industrySalary"
                placeholder="Industry Average Salary"
                type="number"
                min="0"
                value={formData.industrySalary || ""}
                onChange={(e) => handleChange("industrySalary", Number(e.target.value))}
                required
                className="border-gray-400 bg-white text-gray-900 placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Select
                value={formData.incomeDependency}
                onValueChange={(value) => handleChange("incomeDependency", value)}
                required
              >
                <SelectTrigger className="border-gray-400 bg-white text-gray-900 py-6">
                  <SelectValue placeholder="Income Dependency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                  <SelectItem value="NotMuch">Not Much</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="button"
              onClick={handleNextStep}
              className="flex items-center gap-2 rounded-full bg-[#d452b9] px-6 py-2 text-white hover:bg-[#b33d9b]"
            >
              Next <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <h2 className="mb-6 text-xl font-medium">Skills & Qualifications</h2>

          <div className="space-y-4">
            <Select
              value={formData.qualification}
              onValueChange={(value) => handleChange("qualification", value)}
              required
            >
              <SelectTrigger className="w-full border-gray-400 bg-white text-gray-900 py-6">
                <SelectValue placeholder="Highest Qualification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Diploma">Diploma</SelectItem>
                <SelectItem value="Bachelors">Bachelors</SelectItem>
                <SelectItem value="DiplomaEquivalentToBachelors">Diploma equivalent to Bachelors</SelectItem>
                <SelectItem value="Masters">Masters</SelectItem>
                <SelectItem value="PhD">PhD</SelectItem>
              </SelectContent>
            </Select>

            <Select value={formData.skillsMatch} onValueChange={(value) => handleChange("skillsMatch", value)} required>
              <SelectTrigger className="w-full border-gray-400 bg-white text-gray-900 py-6">
                <SelectValue placeholder="Do your Skillset Match?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="Maybe">Maybe</SelectItem>
                <SelectItem value="Nope">Nope</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={formData.betterSkillsOtherRole}
              onValueChange={(value) => handleChange("betterSkillsOtherRole", value)}
              required
            >
              <SelectTrigger className="w-full border-gray-400 bg-white text-gray-900 py-6">
                <SelectValue placeholder="Better Skills for Other Roles?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="Maybe">Maybe</SelectItem>
                <SelectItem value="AbsolutelyYes">Absolutely, Yes!</SelectItem>
                <SelectItem value="Nope">Nope</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={formData.promotionOutlook}
              onValueChange={(value) => handleChange("promotionOutlook", value)}
              required
            >
              <SelectTrigger className="w-full border-gray-400 bg-white text-gray-900 py-6">
                <SelectValue placeholder="Promotion Outlook" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fair">Fair</SelectItem>
                <SelectItem value="PromotionOnTheSakeOfName">Promotion on the sake of Name</SelectItem>
                <SelectItem value="BelowIndustry">Below Industry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" onClick={handlePrevStep} variant="ghost" className="text-gray-600">
              Back
            </Button>
            <Button
              type="button"
              onClick={handleNextStep}
              className="rounded-full bg-[#d452b9] px-6 py-2 text-white hover:bg-[#b33d9b]"
            >
              Next
            </Button>
          </div>
        </>
      )}

      {currentStep === 3 && (
        <>
          <h2 className="mb-6 text-xl font-medium">Job Satisfaction</h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="growthOpportunities">Are there growth opportunities in your current role?</Label>
                <span className="text-sm">{formData.growthOpportunities}/10</span>
              </div>
              <SmoothSlider
                id="growthOpportunities"
                value={formData.growthOpportunities}
                onCommit={(v) => handleChange("growthOpportunities", v)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="workLifeBalance">How balanced is your work-life?</Label>
                <span className="text-sm">{formData.workLifeBalance}/10</span>
              </div>
              <SmoothSlider
                id="workLifeBalance"
                value={formData.workLifeBalance}
                onCommit={(v) => handleChange("workLifeBalance", v)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="mentalHealthImpact">How much is your mental health affected?</Label>
                <span className="text-sm">{formData.mentalHealthImpact}/10</span>
              </div>
              <SmoothSlider
                id="mentalHealthImpact"
                value={formData.mentalHealthImpact}
                onCommit={(v) => handleChange("mentalHealthImpact", v)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="learningOpportunities">Are there learning opportunities in this role?</Label>
                <span className="text-sm">{formData.learningOpportunities}/10</span>
              </div>
              <SmoothSlider
                id="learningOpportunities"
                value={formData.learningOpportunities}
                onCommit={(v) => handleChange("learningOpportunities", v)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="promotionOutlook">What do you see about promotion in that company?</Label>
              <Select
                value={formData.promotionOutlook}
                onValueChange={(value) => handleChange("promotionOutlook", value)}
                required
              >
                <SelectTrigger className="w-full border-gray-400 bg-white text-gray-900 py-6">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="PromotionOnTheSakeOfName">Promotion on the sake of Name</SelectItem>
                  <SelectItem value="BelowIndustry">Below Industry</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              onClick={handlePrevStep}
              variant="outline"
              className="rounded-full px-6 py-2 bg-transparent"
            >
              Back
            </Button>
            <Button type="submit" className="rounded-full bg-[#d452b9] px-6 py-2 text-white hover:bg-[#b33d9b]">
              Complete Analysis
            </Button>
          </div>
        </>
      )}
    </form>
  )
}
