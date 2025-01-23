import CategoryComponent from "@/components/Admin/Category/CategoryComponent";
import React from "react";
import { prisma } from "../../../../../prisma/client";

const CategoryPage = async () => {
  const data = await prisma.category.findMany();

  return (
    <>
      <div className="flex min-h-screen flex-col items-center px-6">
        <div className=" max-w-7xl flex flex-col gap-5 w-full py-4">
          <CategoryComponent data={data} />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
