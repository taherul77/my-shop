"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, RadialBar, RadialBarChart } from "recharts"
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

// Function to generate random data for each browser
const generateRandomData = () => {
  const browsers = ["Chrome", "Safari", "Firefox", "Edge", "Other"]
  return browsers.map((browser) => ({
    browser,
    visitors: Math.floor(Math.random() * 3000),
  }))
}

// Generate random chart data
const chartData = generateRandomData()

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "teal",
  },
  safari: {
    label: "Safari",
    color: "teal",
  },
  firefox: {
    label: "Firefox",
    color: "teal",
  },
  edge: {
    label: "Edge",
    color: "teal",
  },
  other: {
    label: "Other",
    color: "teal",
  },
} satisfies ChartConfig

export function Roundbar() {
  const { theme } = useTheme()
  const chartColor = theme === "light" ? "#000000" : "teal"

  const randomChartData = chartData.map(item => ({
    ...item,
    fill: chartColor,
  }))

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Browser Usage</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={randomChartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <RadialBar dataKey="visitors" background>
              <LabelList
                position="insideStart"
                dataKey="browser"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}