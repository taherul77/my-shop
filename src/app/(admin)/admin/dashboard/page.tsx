"use client"
import React, { useEffect, useState } from "react";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/shared/Card/Card";
import SalesCard, { SalesProps } from "@/components/shared/SalesCard/SalesCard";
import BarChart from "@/components/shared/BarChart/BarChart";
import { Component } from "@/components/shared/dashboard";
import { Barchart } from "@/components/shared/barchart";
import { Roundbar } from "@/components/shared/roundbar";
import { LongChart } from "@/components/shared/longchart";
import { Radiar } from "@/components/shared/radiarchart";
import { LineChart2 } from "@/components/shared/LineChart2";

// Function to generate random card data
const generateRandomCardData = () => {
  return [
    {
      label: "Total Revenue",
      amount: `$${(Math.random() * 50000).toFixed(2)}`,
      discription: `+${(Math.random() * 100).toFixed(1)}% from last month`,
      icon: DollarSign,
    },
    {
      label: "Subscription",
      amount: `+${Math.floor(Math.random() * 5000)}`,
      discription: `+${(Math.random() * 200).toFixed(1)}% from last month`,
      icon: Users,
    },
    {
      label: "Sales",
      amount: `+${Math.floor(Math.random() * 20000)}`,
      discription: `+${(Math.random() * 50).toFixed(1)}% from last month`,
      icon: CreditCard,
    },
    {
      label: "Active Now",
      amount: `+${Math.floor(Math.random() * 1000)}`,
      discription: `+${Math.floor(Math.random() * 300)} from last month`,
      icon: Activity,
    },
  ];
};

// Function to generate random user sales data
const generateRandomUserSalesData = () => {
  const names = ["Olivia Martin", "Jackson Lee", "Isabella Nguyen", "William Kim", "Sofia Davis"];
  const emails = ["olivia.martin@email.com", "jackson.lee@email.com", "isabella.nguyen@email.com", "william.kim@email.com", "sofia.davis@email.com"];
  
  return names.map((name, index) => ({
    name,
    email: emails[index],
    salesAmount: `+$${(Math.random() * 2000).toFixed(2)}`,
  }));
};

const Page = () => {
  const [cardData, setCardData] = useState<CardProps[]>([]);
  const [userSalesData, setUserSalesData] = useState<SalesProps[]>([]);

  useEffect(() => {
    setCardData(generateRandomCardData());
    setUserSalesData(generateRandomUserSalesData());
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center px-6">
      <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="col-span-1">
          <Component />
        </div>
        <div className="col-span-1">
          <Barchart />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <Roundbar />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <LongChart />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <Radiar />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-2">
          <LineChart2 />
        </div>
      </div>

      <div className="max-w-7xl flex flex-col gap-5 w-full py-4">
        <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
          {cardData.map((data, index) => (
            <Card
              key={index}
              amount={data.amount}
              discription={data.discription}
              icon={data.icon}
              label={data.label}
            />
          ))}
        </section>
        <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2 py-4">
          <CardContent>
            <p className="p-4 font-semibold text-black dark:text-white">Overview</p>
            <BarChart />
          </CardContent>
          <CardContent className="flex justify-between gap-4">
            <section>
              <p>Recent Sales</p>
              <p className="text-sm text-gray-400">
                You made 265 sales this month.
              </p>
            </section>
            {userSalesData.map((data, index) => (
              <SalesCard
                key={index}
                email={data.email}
                name={data.name}
                salesAmount={data.salesAmount}
              />
            ))}
          </CardContent>
        </section>
      </div>
    </div>
  );
};

export default Page;