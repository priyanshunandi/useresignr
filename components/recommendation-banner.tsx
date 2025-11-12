"use client"

import { Card } from "@/components/ui/card"
import type { JobAnalysisData } from "@/lib/types"
import { CheckCircle2, Info, AlertTriangle } from "lucide-react"

type Props = {
  data: JobAnalysisData
  score: number
  salaryDifferencePct: number // negative => below industry
}

function recommendationFor(score: number) {
  if (score >= 8) {
    return {
      key: "stay",
      title: "Strong fit — keep growing",
      Icon: CheckCircle2,
      tone: "bg-emerald-50 text-emerald-800 border-emerald-300",
      dot: "bg-emerald-500",
    }
  }
  if (score >= 6) {
    return {
      key: "address",
      title: "Good potential — address a few areas",
      Icon: Info,
      tone: "bg-amber-50 text-amber-800 border-amber-300",
      dot: "bg-amber-500",
    }
  }
  if (score >= 4) {
    return {
      key: "explore",
      title: "Mixed alignment — explore better options",
      Icon: Info,
      tone: "bg-violet-50 text-violet-800 border-violet-300",
      dot: "bg-violet-500",
    }
  }
  return {
    key: "move",
    title: "Consider moving on",
    Icon: AlertTriangle,
    tone: "bg-rose-50 text-rose-800 border-rose-300",
    dot: "bg-rose-500",
  }
}

export default function RecommendationBanner({ data, score, salaryDifferencePct }: Props) {
  const rec = recommendationFor(score)

  const bullets: string[] = []

  if (salaryDifferencePct < -10) {
    bullets.push("Your salary is notably below industry average for your experience.")
  }
  if (data.workLifeBalance < 5) {
    bullets.push("Work‑life balance is below a healthy threshold.")
  }
  if (data.mentalHealthImpact > 6) {
    bullets.push("Role is negatively affecting your mental well‑being.")
  }
  if (data.growthOpportunities < 5) {
    bullets.push("Limited growth opportunities are visible in the near term.")
  }
  if (data.skillsMatch !== "Yes") {
    bullets.push("Your current skills may fit better in another role or team.")
  }
  if (!bullets.length) {
    bullets.push("Your inputs indicate overall alignment with your goals and well‑being.")
  }

  // Tailored next-steps line
  const nextSteps =
    rec.key === "stay"
      ? "Keep investing in learning and advocate for stretch projects or mentorship."
      : rec.key === "address"
        ? "Document concerns and discuss them with your manager; set a 4–6 week improvement plan."
        : rec.key === "explore"
          ? "Update your resume, talk to peers, and apply selectively while you continue in the current role."
          : "Start an active search while maintaining your current position for financial stability."

  // Income dependency caution
  const showCaution = data.incomeDependency === "Yes" && rec.key !== "stay"

  return (
    <Card
      key={`${rec.key}-${score}-${data.workLifeBalance}-${data.growthOpportunities}-${data.mentalHealthImpact}-${data.skillsMatch}-${Math.round(Number.isFinite(salaryDifferencePct) ? salaryDifferencePct : 0)}`}
      className={`mb-6 border ${rec.tone} rounded-xl p-4 md:p-5 shadow-sm`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-start gap-3">
        <rec.Icon className="mt-0.5 h-5 w-5" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm font-medium text-current">
              <span className={`h-2 w-2 rounded-full ${rec.dot}`} />
              {rec.title}
            </span>
            <span className="text-sm opacity-80">Score {score}/10</span>
            <span className="text-xs rounded-full bg-white/70 px-2 py-0.5 opacity-80">
              Salary Δ {Number.isFinite(salaryDifferencePct) ? salaryDifferencePct.toFixed(1) : "0.0"}%
            </span>
          </div>

          {/* Dynamic reasons (no slicing) */}
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            {bullets.map((b, i) => (
              <li key={`${rec.key}-bullet-${i}`}>{b}</li>
            ))}
          </ul>

          {/* Tailored next step */}
          <p className="mt-3 text-sm font-medium">{nextSteps}</p>

          {/* Caution when income dependency is high */}
          {showCaution && (
            <p className="mt-2 text-xs opacity-80">
              Note: You indicated a high dependency on current income — plan transitions cautiously.
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}
