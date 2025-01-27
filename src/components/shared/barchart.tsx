"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
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

// Function to generate random data for each month
const generateRandomData = () => {
  const months = ["January", "February", "March", "April", "May", "June"]
  return months.map((month) => ({
    month,
    signUps: Math.floor(Math.random() * 400),
  }))
}

// Generate random chart data
const chartData = generateRandomData()

const chartConfig = {
  signUps: {
    label: "Sign-Ups",
    color: "teal",
  },
} satisfies ChartConfig

export function Barchart() {
  const { theme } = useTheme()
  const barColor = theme === "light" ? "#000000" : "teal"

  return (
    <Card>
      <CardHeader>
        <CardTitle>New User Sign-Ups</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="signUps" fill={barColor} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing new user sign-ups for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}