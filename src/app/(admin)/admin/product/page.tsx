import ProductComponent from "@/components/Admin/Product/ProductComponent";
import React from "react";
import { prisma } from "../../../../../prisma/client";

const ProductPage = async () => {
  const data = await prisma.product.findMany();
  console.log(data);

  return (
    <div>
      <ProductComponent data={data} />
    </div>
  );
};

export default ProductPage;
