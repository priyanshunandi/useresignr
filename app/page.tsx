import type { Metadata } from "next"
import JobAnalysisForm from "@/components/job-analysis-form"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "resignr | Job Analysis Tool",
  description: "Analyze your current job and decide whether to stay or resign",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#e6f0ff] p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <Header />

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <JobAnalysisForm />
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          This tool is designed to help with career reflection, but the final decision is always yours.
        </div>
      </div>
    </main>
  )
}
