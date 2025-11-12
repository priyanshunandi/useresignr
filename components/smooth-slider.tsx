"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type SmoothSliderProps = {
  id: string
  value: number
  onCommit: (value: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

export function SmoothSlider({ id, value, onCommit, min = 1, max = 10, step = 1, className }: SmoothSliderProps) {
  // temporary value for a buttery drag experience
  const [temp, setTemp] = useState(value)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // sync external changes (e.g., when navigating back)
    if (!dragging) setTemp(value)
  }, [value, dragging])

  const percent = useMemo(() => {
    const p = ((temp - min) / (max - min)) * 100
    return Number.isFinite(p) ? Math.min(100, Math.max(0, p)) : 0
  }, [temp, min, max])

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full py-3", className)}
      onPointerDown={() => setDragging(true)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchEnd={() => setDragging(false)}
    >
      {/* Subtle fill preview for smoother perception */}
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 -z-10 -translate-y-1/2">
        <div className="h-2 w-full rounded-full bg-gray-200" />
        <div
          className="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-[#FF66EB] to-[#993D8D]"
          style={{ width: `${percent}%` }}
        />
      </div>

      <Slider
        id={id}
        value={[temp]}
        min={min}
        max={max}
        step={step}
        aria-label={id}
        aria-valuetext={`${temp} of ${max}`}
        onValueChange={(v) => setTemp(v[0])}
        onValueCommit={(v) => {
          const rounded = Math.round(v[0])
          setTemp(rounded)
          onCommit(rounded)
        }}
        className="relative"
      />

      {/* Live value bubble */}
      <AnimatePresence>
        {dragging && (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="pointer-events-none absolute -top-6"
            style={{ left: `calc(${percent}% )`, transform: "translateX(-50%)" }}
          >
            <div className="rounded-full bg-[#593566] px-2 py-0.5 text-xs text-white shadow">{temp}/10</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
