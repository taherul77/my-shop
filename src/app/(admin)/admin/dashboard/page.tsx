import React from "react";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/shared/Card/Card";
import SalesCard, { SalesProps } from "@/components/shared/SalesCard/SalesCard";
import BarChart from "@/components/shared/BarChart/BarChart";
import Navbar from "@/components/shared/Navbar";
import { Component } from "@/components/shared/dashboard";
import { Barchart } from "@/components/shared/barchart";
import { Roundbar } from "@/components/shared/roundbar";
import { LongChart } from "@/components/shared/longchart";
import { Radiar } from "@/components/shared/radiarchart";
import { LineChart2 } from "@/components/shared/LineChart2";
const page = () => {
  const cardData: CardProps[] = [
    {
      label: "Total Revenue",
      amount: "$45,231.89",
      discription: "+20.1% from last month",
      icon: DollarSign,
    },
    {
      label: "Subscription",
      amount: "+2350",
      discription: "+180.1% from last month",
      icon: Users,
    },
    {
      label: "Sales",
      amount: "+12,234",
      discription: "+19% from last month",
      icon: CreditCard,
    },
    {
      label: "Active Mow",
      amount: "+573",
      discription: "+201 from last month",
      icon: Activity,
    },
  ];

  const userSalesData: SalesProps[] = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      salesAmount: "+$1,999.00",
    },
    {
      name: "Jackson Lee",
      email: "isabella.nguyen@email.com",
      salesAmount: "+$1,999.00",
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      salesAmount: "+$39.00",
    },
    {
      name: "William Kim",
      email: "will@email.com",
      salesAmount: "+$299.00",
    },
    {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      salesAmount: "+$39.00",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center p-6">
      <Navbar />


      <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-24">
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
        <div className="col-span-1 sm:col-span-2  lg:col-span-1">
          <Radiar />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-2">
          <LineChart2 />
        </div>
      </div>


      <div className=" max-w-7xl lex flex-col gap-5 w-full py-4">
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
            <p className="p-4 font-semibold">Overview</p>
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

export default page;
