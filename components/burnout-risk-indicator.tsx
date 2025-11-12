"use client"

import { Card } from "@/components/ui/card"
import { AlertTriangle, AlertCircle, CheckCircle, Info } from "lucide-react"
import type { JobAnalysisData } from "@/lib/types"

type Props = {
  data: JobAnalysisData
}

type RiskLevel = {
  level: "low" | "moderate" | "high" | "critical"
  label: string
  color: string
  bgColor: string
  borderColor: string
  Icon: typeof CheckCircle
  score: number
  interventions: string[]
}

function calculateBurnoutRisk(data: JobAnalysisData): RiskLevel {
  // Calculate burnout score (0-100, higher = more risk)
  // Mental health impact: 1-10 (higher = worse) -> weight 40%
  // Work-life balance: 1-10 (lower = worse) -> weight 35%
  // Learning opportunities: 1-10 (lower = worse) -> weight 15%
  // Growth opportunities: 1-10 (lower = worse) -> weight 10%

  const mentalHealthScore = (data.mentalHealthImpact / 10) * 40
  const workLifeScore = ((10 - data.workLifeBalance) / 10) * 35
  const learningScore = ((10 - data.learningOpportunities) / 10) * 15
  const growthScore = ((10 - data.growthOpportunities) / 10) * 10

  const totalScore = Math.round(mentalHealthScore + workLifeScore + learningScore + growthScore)

  // Determine risk level and interventions
  if (totalScore >= 70) {
    return {
      level: "critical",
      label: "Critical Risk",
      color: "text-red-800",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      Icon: AlertTriangle,
      score: totalScore,
      interventions: [
        "Seek immediate support from a mental health professional",
        "Consider taking medical leave if available",
        "Document your situation and speak with HR about accommodations",
        "Begin active job search while protecting your health",
        "Set strict work boundaries and disconnect after hours",
      ],
    }
  } else if (totalScore >= 50) {
    return {
      level: "high",
      label: "High Risk",
      color: "text-orange-800",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300",
      Icon: AlertCircle,
      score: totalScore,
      interventions: [
        "Schedule a conversation with your manager about workload",
        "Take all available PTO and truly disconnect",
        "Establish clear work-life boundaries (no emails after 6pm, etc.)",
        "Start exploring other opportunities as a backup plan",
        "Practice daily stress management (exercise, meditation, hobbies)",
      ],
    }
  } else if (totalScore >= 30) {
    return {
      level: "moderate",
      label: "Moderate Risk",
      color: "text-amber-800",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-300",
      Icon: Info,
      score: totalScore,
      interventions: [
        "Monitor your stress levels weekly and track patterns",
        "Build in regular breaks and recovery time",
        "Identify specific stressors and create mitigation strategies",
        "Strengthen your support network (friends, mentors, peers)",
        "Consider if small changes could improve your situation",
      ],
    }
  } else {
    return {
      level: "low",
      label: "Low Risk",
      color: "text-emerald-800",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-300",
      Icon: CheckCircle,
      score: totalScore,
      interventions: [
        "Maintain your current healthy work habits",
        "Continue prioritizing work-life balance",
        "Stay proactive about stress management",
        "Keep communication open with your manager",
        "Regularly reassess to catch early warning signs",
      ],
    }
  }
}

export default function BurnoutRiskIndicator({ data }: Props) {
  const risk = calculateBurnoutRisk(data)

  return (
    <Card className={`mb-6 border ${risk.borderColor} ${risk.bgColor} rounded-xl p-5 md:p-6 shadow-sm`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <risk.Icon className={`h-6 w-6 ${risk.color}`} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">Burnout Risk Assessment</h3>
              <p className="text-sm opacity-80">Based on mental health, work-life balance, and growth factors</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className={`text-2xl font-bold ${risk.color}`}>{risk.score}</div>
                <div className="text-xs opacity-70">Risk Score</div>
              </div>
            </div>
          </div>

          {/* Risk Level Badge */}
          <div className="mb-4">
            <span
              className={`inline-flex items-center gap-2 rounded-full ${risk.bgColor} border ${risk.borderColor} px-4 py-1.5 text-sm font-medium ${risk.color}`}
            >
              <span className={`h-2 w-2 rounded-full ${risk.color.replace("text-", "bg-")}`} />
              {risk.label}
            </span>
          </div>

          {/* Visual Risk Gauge */}
          <div className="mb-4">
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full transition-all duration-1000 ease-out ${
                  risk.level === "critical"
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : risk.level === "high"
                      ? "bg-gradient-to-r from-orange-500 to-orange-600"
                      : risk.level === "moderate"
                        ? "bg-gradient-to-r from-amber-500 to-amber-600"
                        : "bg-gradient-to-r from-emerald-500 to-emerald-600"
                }`}
                style={{ width: `${risk.score}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>Low</span>
              <span>Moderate</span>
              <span>High</span>
              <span>Critical</span>
            </div>
          </div>

          {/* Interventions */}
          <div>
            <h4 className="mb-2 text-sm font-semibold">Recommended Actions:</h4>
            <ul className="space-y-1.5">
              {risk.interventions.map((intervention, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-current opacity-60" />
                  <span>{intervention}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Warning for critical cases */}
          {risk.level === "critical" && (
            <div className="mt-4 rounded-lg bg-red-100 p-3 text-sm font-medium text-red-900">
              Your responses indicate serious burnout risk. Please prioritize your health and consider seeking
              professional support immediately.
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
