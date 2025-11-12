"use client"

import { ResponsiveRadar } from "@nivo/radar"
import type { JobAnalysisData } from "@/lib/types"

interface RadarChartProps {
  data: JobAnalysisData
}

export const RadarChart = ({ data }: RadarChartProps) => {
  const chartData = [
    {
      factor: "Work-Life Balance",
      value: data.workLifeBalance,
    },
    {
      factor: "Mental Health",
      value: 10 - data.mentalHealthImpact, // Invert the scale for better visualization
    },
    {
      factor: "Growth",
      value: data.growthOpportunities,
    },
    {
      factor: "Learning",
      value: data.learningOpportunities,
    },
    {
      factor: "Skills Match",
      value: data.skillsMatch === "Yes" ? 10 : data.skillsMatch === "Maybe" ? 5 : 0,
    },
    {
      factor: "Salary",
      value: data.currentSalary >= data.industrySalary ? 10 : (data.currentSalary / data.industrySalary) * 10,
    },
    {
      factor: "Promotion",
      value: data.promotionOutlook === "Fair" ? 8 : data.promotionOutlook === "PromotionOnTheSakeOfName" ? 5 : 3,
    },
  ]

  return (
    <div className="h-[400px] w-full">
      <ResponsiveRadar
        data={chartData}
        keys={["value"]}
        indexBy="factor"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: "color" }}
        gridLabelOffset={36}
        dotSize={8}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        colors={["#FF66EB"]}
        fillOpacity={0.6}
        blendMode="normal"
        motionConfig="gentle"
        maxValue={10}
        gridShape="circular"
        theme={{
          grid: {
            line: {
              stroke: "#993D8D",
              strokeWidth: 1,
              strokeOpacity: 0.3,
            },
          },
          dots: {
            text: {
              fill: "#993D8D",
            },
          },
        }}
      />
    </div>
  )
}
