"use client"

import type { JobAnalysisData } from "@/lib/types"

type Props = {
  data: JobAnalysisData
  score: number
  salaryDifferencePct: number
}

export default function ResultsOverview(_props: Props) {
  // Overview removed per request; render nothing
  return null
}
