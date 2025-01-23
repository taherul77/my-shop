import ProductComponent from "@/components/Admin/Product/ProductComponent";
import React from "react";
import { prisma } from "../../../../../prisma/client";

const ProductPage = async () => {
  const data = await prisma.product.findMany();

  return (
    <>
      <div className="flex min-h-screen flex-col items-center px-6">
        <div className=" max-w-7xl flex flex-col gap-5 w-full py-4">
          <ProductComponent data={data} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
