"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export const ShareResults = () => {
  const [email, setEmail] = useState("")

  const handleShare = () => {
    // In a real application, you would implement the sharing logic here
    console.log(`Sharing results to: ${email}`)
    toast({
      title: "Results Shared",
      description: `Your results have been sent to ${email}`,
    })
    setEmail("")
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Share Your Results</h3>
      <div className="flex space-x-4">
        <div className="flex-grow space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="colleague@example.com"
          />
        </div>
        <Button onClick={handleShare} className="mt-8">
          Share
        </Button>
      </div>
    </div>
  )
}
