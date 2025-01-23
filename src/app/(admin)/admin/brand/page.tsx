import BrandComponent from "@/components/Admin/Brand/BrandComponent";
import React from "react";
import { prisma } from "../../../../../prisma/client";

const BrandPage = async () => {
  const data = await prisma.brand.findMany();


  return (
    <div className="flex min-h-screen flex-col items-center px-6">
      <div className=" max-w-7xl flex flex-col gap-5 w-full py-4">
      <BrandComponent data={data} />
      </div>
    </div>
  );
};

export default BrandPage;
