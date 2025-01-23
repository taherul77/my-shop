"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { useTheme } from "next-themes"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Fake data representing CPU usage over time
const chartData = [
  { date: "2024-04-01", desktop: 22, mobile: 15 },
  { date: "2024-04-02", desktop: 27, mobile: 18 },
  { date: "2024-04-03", desktop: 17, mobile: 12 },
  { date: "2024-04-04", desktop: 24, mobile: 26 },
  { date: "2024-04-05", desktop: 37, mobile: 29 },
  { date: "2024-04-06", desktop: 30, mobile: 34 },
  { date: "2024-04-07", desktop: 25, mobile: 18 },
  { date: "2024-04-08", desktop: 40, mobile: 32 },
  { date: "2024-04-09", desktop: 15, mobile: 11 },
  { date: "2024-04-10", desktop: 26, mobile: 19 },
  { date: "2024-04-11", desktop: 32, mobile: 35 },
  { date: "2024-04-12", desktop: 29, mobile: 21 },
  { date: "2024-04-13", desktop: 34, mobile: 38 },
  { date: "2024-04-14", desktop: 13, mobile: 22 },
  { date: "2024-04-15", desktop: 12, mobile: 17 },
  { date: "2024-04-16", desktop: 13, mobile: 19 },
  { date: "2024-04-17", desktop: 44, mobile: 36 },
  { date: "2024-04-18", desktop: 36, mobile: 41 },
  { date: "2024-04-19", desktop: 24, mobile: 18 },
  { date: "2024-04-20", desktop: 9, mobile: 15 },
  { date: "2024-04-21", desktop: 13, mobile: 20 },
  { date: "2024-04-22", desktop: 22, mobile: 17 },
  { date: "2024-04-23", desktop: 13, mobile: 23 },
  { date: "2024-04-24", desktop: 38, mobile: 29 },
  { date: "2024-04-25", desktop: 21, mobile: 25 },
  { date: "2024-04-26", desktop: 7, mobile: 13 },
  { date: "2024-04-27", desktop: 38, mobile: 42 },
  { date: "2024-04-28", desktop: 12, mobile: 18 },
  { date: "2024-04-29", desktop: 31, mobile: 24 },
  { date: "2024-04-30", desktop: 45, mobile: 38 },
  { date: "2024-05-01", desktop: 16, mobile: 22 },
  { date: "2024-05-02", desktop: 29, mobile: 31 },
  { date: "2024-05-03", desktop: 24, mobile: 19 },
  { date: "2024-05-04", desktop: 38, mobile: 42 },
  { date: "2024-05-05", desktop: 48, mobile: 39 },
  { date: "2024-05-06", desktop: 49, mobile: 52 },
  { date: "2024-05-07", desktop: 38, mobile: 30 },
  { date: "2024-05-08", desktop: 14, mobile: 21 },
  { date: "2024-05-09", desktop: 23, mobile: 18 },
  { date: "2024-05-10", desktop: 29, mobile: 33 },
  { date: "2024-05-11", desktop: 33, mobile: 27 },
  { date: "2024-05-12", desktop: 19, mobile: 24 },
  { date: "2024-05-13", desktop: 19, mobile: 16 },
  { date: "2024-05-14", desktop: 44, mobile: 49 },
  { date: "2024-05-15", desktop: 47, mobile: 38 },
  { date: "2024-05-16", desktop: 34, mobile: 40 },
  { date: "2024-05-17", desktop: 49, mobile: 42 },
  { date: "2024-05-18", desktop: 31, mobile: 35 },
  { date: "2024-05-19", desktop: 23, mobile: 18 },
  { date: "2024-05-20", desktop: 17, mobile: 23 },
  { date: "2024-05-21", desktop: 8, mobile: 14 },
  { date: "2024-05-22", desktop: 8, mobile: 12 },
  { date: "2024-05-23", desktop: 25, mobile: 29 },
  { date: "2024-05-24", desktop: 29, mobile: 22 },
  { date: "2024-05-25", desktop: 20, mobile: 25 },
  { date: "2024-05-26", desktop: 21, mobile: 17 },
  { date: "2024-05-27", desktop: 42, mobile: 46 },
  { date: "2024-05-28", desktop: 23, mobile: 19 },
  { date: "2024-05-29", desktop: 8, mobile: 13 },
  { date: "2024-05-30", desktop: 34, mobile: 28 },
  { date: "2024-05-31", desktop: 17, mobile: 23 },
  { date: "2024-06-01", desktop: 17, mobile: 20 },
  { date: "2024-06-02", desktop: 47, mobile: 41 },
  { date: "2024-06-03", desktop: 10, mobile: 16 },
  { date: "2024-06-04", desktop: 44, mobile: 38 },
  { date: "2024-06-05", desktop: 8, mobile: 14 },
  { date: "2024-06-06", desktop: 29, mobile: 25 },
  { date: "2024-06-07", desktop: 32, mobile: 37 },
  { date: "2024-06-08", desktop: 38, mobile: 32 },
  { date: "2024-06-09", desktop: 43, mobile: 48 },
  { date: "2024-06-10", desktop: 15, mobile: 20 },
  { date: "2024-06-11", desktop: 9, mobile: 15 },
  { date: "2024-06-12", desktop: 49, mobile: 42 },
  { date: "2024-06-13", desktop: 8, mobile: 13 },
  { date: "2024-06-14", desktop: 42, mobile: 38 },
  { date: "2024-06-15", desktop: 31, mobile: 35 },
  { date: "2024-06-16", desktop: 37, mobile: 31 },
  { date: "2024-06-17", desktop: 47, mobile: 52 },
  { date: "2024-06-18", desktop: 10, mobile: 17 },
  { date: "2024-06-19", desktop: 34, mobile: 29 },
  { date: "2024-06-20", desktop: 40, mobile: 45 },
  { date: "2024-06-21", desktop: 16, mobile: 21 },
  { date: "2024-06-22", desktop: 31, mobile: 27 },
  { date: "2024-06-23", desktop: 48, mobile: 53 },
  { date: "2024-06-24", desktop: 13, mobile: 18 },
  { date: "2024-06-25", desktop: 14, mobile: 19 },
  { date: "2024-06-26", desktop: 43, mobile: 38 },
  { date: "2024-06-27", desktop: 44, mobile: 49 },
  { date: "2024-06-28", desktop: 14, mobile: 20 },
  { date: "2024-06-29", desktop: 10, mobile: 16 },
  { date: "2024-06-30", desktop: 44, mobile: 40 },
]

const chartConfig = {
  cpuUsage: {
    label: "CPU Usage",
  },
  desktop: {
    label: "Desktop",
    color: "teal",
  },
  mobile: {
    label: "Mobile",
    color: "teal",
  },
} satisfies ChartConfig

export function LongChart() {
  const { theme } = useTheme()
  const chartColor = theme === "light" ? "#000000" : "teal"

  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    now.setDate(now.getDate() - daysToSubtract)
    return date >= now
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>CPU Usage Over Time</CardTitle>
          <CardDescription>
            Showing CPU usage for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[180px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke={chartColor}
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke={chartColor}
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
