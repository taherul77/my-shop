"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { useTheme } from "next-themes"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Fake data representing total visitors to the website for the last 6 months
const chartData = [
  { month: "January", visitors: 1200 },
  { month: "February", visitors: 1500 },
  { month: "March", visitors: 1350 },
  { month: "April", visitors: 1600 },
  { month: "May", visitors: 1750 },
  { month: "June", visitors: 1800 },
]

const chartConfig = {
  visitors: {
    label: "Total Visitors",
    color: "teal",
  },
} satisfies ChartConfig

export function Radiar() {
  const { theme } = useTheme()
  const chartColor = theme === "light" ? "#000000" : "teal"

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="visitors"
              fill={chartColor}
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  )
}
