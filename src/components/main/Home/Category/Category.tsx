"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { ProductDetails } from "@/types";


interface CategoryProps {
  brandsWithImages: ProductDetails[];
}

const Category: React.FC<CategoryProps> = ({ brandsWithImages }) => {
  return (
    <div className="container max-auto max-w-6xl">
      <div className="flex justify-center lg:justify-start items-center py-10">
        <div className="text-xl md:text-3xl lg:text-5xl font-normal text-black dark:text-white">
          Our <span className="text-brandColor">B</span>rand
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandsWithImages?.map((brand) => (
          <ProductCard
            key={brand.id}
            name={brand.name}
            link={`/brands/${brand.id}`}
            imageUrl={brand.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;