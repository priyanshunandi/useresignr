"use client"

interface CircularProgressProps {
  value: number
  maxValue: number
}

export function CircularProgress({ value, maxValue }: CircularProgressProps) {
  const percentage = (value / maxValue) * 100
  const circumference = 2 * Math.PI * 45 // radius is 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative h-40 w-40">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle className="stroke-gray-200" strokeWidth="10" fill="transparent" r="45" cx="50" cy="50" />
        {/* Progress circle */}
        <circle
          className="stroke-[#FF66EB] transition-all duration-1000 ease-in-out"
          strokeWidth="10"
          strokeLinecap="round"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-bold">{value}</span>
        <span className="text-sm text-gray-500">out of {maxValue}</span>
      </div>
    </div>
  )
}
