"use client"

import { RadarChart, PolarAngleAxis, PolarGrid, Radar, ResponsiveContainer, PolarRadiusAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface WheelChartProps {
  data: Array<{
    area: string
    rating: number
    fullMark: number
  }>
}

export function WheelChart({ data }: WheelChartProps) {
  return (
    <ChartContainer
      config={{
        rating: {
          label: "Rating",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="aspect-square min-h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent />}
            labelFormatter={(label) => `${label}`}
            formatter={(value) => [`${value}/10`, "Rating"]}
          />
          <PolarGrid stroke="hsl(var(--border))" strokeWidth={1} radialLines={true} />
          <PolarAngleAxis
            dataKey="area"
            tick={{
              fontSize: 12,
              fill: "hsl(var(--foreground))",
              textAnchor: "middle",
            }}
            className="text-sm font-medium"
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 10]}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            tickCount={6}
          />
          <Radar
            name="Rating"
            dataKey="rating"
            stroke="hsl(var(--chart-1))"
            fill="hsl(var(--chart-1))"
            fillOpacity={0.3}
            strokeWidth={2}
            dot={{
              r: 4,
              fill: "hsl(var(--chart-1))",
              strokeWidth: 2,
              stroke: "white",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
