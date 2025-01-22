import BrandComponent from "@/components/Admin/Brand/BrandComponent";
import React from "react";
import { prisma } from "../../../../../prisma/client";

const BrandPage = async () => {
  const data = await prisma.brand.findMany();


  return (
    <>
      <BrandComponent data={data} />
    </>
  );
};

export default BrandPage;
