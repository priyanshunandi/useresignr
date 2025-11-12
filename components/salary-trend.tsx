"use client"

import { useState } from "react"
import { ResponsiveLine } from "@nivo/line"
import { Button } from "@/components/ui/button"

interface SalaryTrendProps {
  currentSalary: number
  industrySalary: number
}

export const SalaryTrend = ({ currentSalary, industrySalary }: SalaryTrendProps) => {
  const [years, setYears] = useState(5)

  const generateTrendData = (startSalary: number, growthRate: number) => {
    return Array.from({ length: years }, (_, i) => ({
      x: i,
      y: Math.round(startSalary * Math.pow(1 + growthRate, i)),
    }))
  }

  const yourSalaryTrend = generateTrendData(currentSalary, 0.05) // Assuming 5% annual growth
  const industrySalaryTrend = generateTrendData(industrySalary, 0.03) // Assuming 3% annual industry growth

  const data = [
    {
      id: "Your Salary",
      color: "hsl(324, 100%, 70%)",
      data: yourSalaryTrend,
    },
    {
      id: "Industry Average",
      color: "hsl(271, 39%, 57%)",
      data: industrySalaryTrend,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Salary Trend Prediction</h3>
        <div className="space-x-2">
          <Button variant={years === 5 ? "default" : "outline"} onClick={() => setYears(5)} size="sm">
            5 Years
          </Button>
          <Button variant={years === 10 ? "default" : "outline"} onClick={() => setYears(10)} size="sm">
            10 Years
          </Button>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-$.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Years",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Salary",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  )
}
