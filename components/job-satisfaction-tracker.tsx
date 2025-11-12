"use client"

import { useState } from "react"
import { ResponsiveLine } from "@nivo/line"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const JobSatisfactionTracker = () => {
  const [satisfactionData, setSatisfactionData] = useState([
    { x: "Jan", y: 7 },
    { x: "Feb", y: 6 },
    { x: "Mar", y: 8 },
    { x: "Apr", y: 7 },
    { x: "May", y: 9 },
    { x: "Jun", y: 8 },
  ])

  const [newMonth, setNewMonth] = useState("")
  const [newSatisfaction, setNewSatisfaction] = useState("")

  const handleAddData = () => {
    if (newMonth && newSatisfaction) {
      setSatisfactionData([...satisfactionData, { x: newMonth, y: Number.parseInt(newSatisfaction) }])
      setNewMonth("")
      setNewSatisfaction("")
    }
  }

  const data = [
    {
      id: "Job Satisfaction",
      color: "hsl(324, 100%, 70%)",
      data: satisfactionData,
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Job Satisfaction Tracker</h3>
      <div className="h-[300px]">
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: 0,
            max: 10,
            stacked: false,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Month",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Satisfaction (1-10)",
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
      <div className="flex space-x-4">
        <div className="space-y-2">
          <Label htmlFor="month">Month</Label>
          <Input id="month" value={newMonth} onChange={(e) => setNewMonth(e.target.value)} placeholder="e.g., Jul" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="satisfaction">Satisfaction (1-10)</Label>
          <Input
            id="satisfaction"
            type="number"
            min="1"
            max="10"
            value={newSatisfaction}
            onChange={(e) => setNewSatisfaction(e.target.value)}
            placeholder="1-10"
          />
        </div>
        <Button onClick={handleAddData} className="mt-8">
          Add Data
        </Button>
      </div>
    </div>
  )
}
