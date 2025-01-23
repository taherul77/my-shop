'use client'
import { useTheme } from 'next-themes'
import React from 'react'
import { Bar, ResponsiveContainer } from 'recharts'
import { BarChart as BarGraph, XAxis, YAxis } from 'recharts'

type Props = object

const data = [
    {
      name: "Jan",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Feb",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Mar",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Apr",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "May",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Jun",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Jul",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Aug",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Sep",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Oct",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Nov",
      total: Math.floor(Math.random() * 5000) + 1000
    },
    {
      name: "Dec",
      total: Math.floor(Math.random() * 5000) + 1000
    }
  ];

export default function BarChart({}: Props) {
  const { theme } = useTheme()
  const barColor = theme === "light" ? "#000000" : "teal"
  const lineData = theme === "light" ? "black" : theme === "system" ? "gray-300": "white"

  return (
    <ResponsiveContainer width={'100%'} height={350}>
        <BarGraph data={data}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke={lineData}
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke={lineData}
          fontSize={12}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey={"total"} fill={barColor} radius={[4, 4, 0, 0]} />
        </BarGraph>
    </ResponsiveContainer>
  )
}