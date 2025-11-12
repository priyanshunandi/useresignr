"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, CheckCircle2, User } from "lucide-react"

type Props = {
  score: number
}

export default function ConsultationCTA({ score }: Props) {
  return (
    <Card className="relative mb-6 overflow-hidden border-2 border-[#d452b9]/20 bg-gradient-to-br from-[#f8f0ff] to-white shadow-md">
      {/* Decorative element */}
      <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-[#FF66EB]/10 blur-2xl" />

      <div className="relative p-6 md:p-8">
        <div className="mb-4 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF66EB] to-[#993D8D]">
            <Video className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <h3 className="text-xl font-semibold text-gray-900">Mental reboot. Human guidance</h3>
              <User className="h-5 w-5 text-[#d452b9]" />
            </div>
            <p className="text-sm leading-relaxed text-gray-700">
              Let's change your mental state. We understand your situation. Our certified mental health + career
              counselor will deliver you clarity on:
            </p>
          </div>
        </div>

        <div className="mb-6 grid gap-3 md:grid-cols-3">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d452b9]" />
            <span className="text-sm text-gray-700">Identify your trigger points</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d452b9]" />
            <span className="text-sm text-gray-700">Get back self-esteem</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d452b9]" />
            <span className="text-sm text-gray-700">Career guidance</span>
          </div>
        </div>

        <div className="mb-4 rounded-lg bg-[#FF66EB]/10 p-3">
          <p className="text-center text-sm font-medium text-gray-800">
            <span className="font-semibold text-[#d452b9]">100% Human Interaction</span> — No AI. The person you will
            interact with is a real human counselor.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-600">Professional consultation session</p>
            <p className="text-xs text-gray-500">Book a time that works for you</p>
          </div>
          <a
            href="https://checkout.dodopayments.com/buy/pdt_LRMNSgMZUEECCuJ73oqea?quantity=1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="w-full gap-2 bg-gradient-to-r from-[#FF66EB] to-[#d452b9] text-white shadow-lg transition-all hover:shadow-xl sm:w-auto"
            >
              <Video className="h-5 w-5" />
              Book Consultation
            </Button>
          </a>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500 sm:text-left">
          Certified mental health + career counselor • Secure payment via Dodo Payments
        </p>
      </div>
    </Card>
  )
}
