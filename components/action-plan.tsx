"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import type { JobAnalysisData } from "@/lib/types"
import { ExternalLink } from "lucide-react"
import { useState } from "react"

type Props = {
  data: JobAnalysisData
  score: number
  salaryDifferencePct: number
}

type Plan = {
  label: string
  horizon: string
  bullets: string[]
  ctas: { label: string; href?: string }[]
}

function buildPlan(data: JobAnalysisData, score: number, delta: number): Plan {
  // tier by score
  if (score >= 8) {
    const bullets = [
      "Define 2–3 growth goals and a roadmap for the next 90 days.",
      "Request a stretch project or mentorship to accelerate learning.",
      ...(delta < -10 ? ["Benchmark comp and plan a respectful salary review discussion."] : []),
      ...(data.growthOpportunities < 6
        ? ["Schedule quarterly career conversations to surface new opportunities."]
        : []),
      "Protect work‑life boundaries; keep a wellbeing journal weekly.",
    ]
    return {
      label: "Stay and grow",
      horizon: "Next 30–90 days",
      bullets,
      ctas: [{ label: "Create goal checklist" }, { label: "Prepare salary review notes" }],
    }
  }

  if (score >= 6) {
    const bullets = [
      "List top 3 concerns (work‑life, growth, impact) with examples.",
      "Discuss a 4–6 week improvement plan with your manager.",
      ...(delta < -10 ? ["Collect data to support a comp adjustment request."] : []),
      ...(data.skillsMatch !== "Yes"
        ? ["Map your key skills to nearby roles; identify one internal rotation path."]
        : ["Request clearer success metrics and feedback cadence."]),
      "Re‑evaluate progress after 6 weeks.",
    ]
    return {
      label: "Address and reassess",
      horizon: "4–6 weeks",
      bullets,
      ctas: [{ label: "Start improvement plan" }, { label: "Draft talking points" }],
    }
  }

  if (score >= 4) {
    const bullets = [
      "Update resume and LinkedIn; highlight measurable outcomes.",
      "Shortlist 10–15 target companies and 2 role titles.",
      "Allocate 2–3 hours/week to outreach and selective applications.",
      ...(data.betterSkillsOtherRole ? ["Pivot toward roles that match your strongest skills."] : []),
      ...(data.workLifeBalance < 5 ? ["Reduce scope where possible to avoid burnout during search."] : []),
    ]
    return {
      label: "Explore better options",
      horizon: "Next 2–8 weeks",
      bullets,
      ctas: [
        { label: "Start application tracker" },
        { label: "Find matching roles", href: "https://www.google.com/search?q=jobs" },
      ],
    }
  }

  const bullets = [
    "Begin an active search while keeping current role for stability.",
    ...(data.incomeDependency === "Yes"
      ? ["Build a 2–3 month runway; avoid abrupt resignation until you secure an offer."]
      : ["Set a 60‑day target to switch, if feasible."]),
    "Apply to 5–10 curated roles/week; focus on quality, not volume.",
    ...(delta < -10 ? ["Target firms with stronger compensation benchmarks."] : []),
    ...(data.mentalHealthImpact > 7 ? ["Set strict boundaries; speak to a professional if stress persists."] : []),
  ]
  return {
    label: "Plan a transition",
    horizon: "Next 30–60 days",
    bullets,
    ctas: [
      { label: "Create transition plan" },
      { label: "Role search links", href: "https://www.google.com/search?q=jobs" },
    ],
  }
}

export default function ActionPlan({ data, score, salaryDifferencePct }: Props) {
  const plan = buildPlan(data, score, salaryDifferencePct)
  const [checked, setChecked] = useState<boolean[]>(() => new Array(plan.bullets.length).fill(false))

  return (
    <Card className="mb-6 border-0 shadow-sm ring-1 ring-gray-100">
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">Action plan: {plan.label}</h3>
            <p className="text-sm text-gray-600">{plan.horizon}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <ul className="space-y-3">
          {plan.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <Checkbox
                checked={checked[i]}
                onCheckedChange={(v) => {
                  const next = [...checked]
                  next[i] = Boolean(v)
                  setChecked(next)
                }}
                className="mt-0.5"
                aria-label={`Mark step ${i + 1} done`}
              />
              <span className="text-sm leading-6">{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-3">
          {plan.ctas.map((c, i) =>
            c.href ? (
              <a key={i} href={c.href} target="_blank" rel="noreferrer" className="inline-flex">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <ExternalLink className="h-4 w-4" />
                  {c.label}
                </Button>
              </a>
            ) : (
              <Button key={i} variant="outline">
                {c.label}
              </Button>
            ),
          )}
        </div>
      </div>
    </Card>
  )
}
