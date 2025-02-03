import { prisma } from "../../../../../prisma/client";
import ProductCard from "./ProductCard";

export interface ProductDetails {
  name: string;
  imageUrl: string;
  link: string;
}

const Category = async () => {
  const brandData = await prisma.brand.findMany();
  console.log(brandData);

  return (
    <div className="container max-auto max-w-6xl">
      <div className="flex justify-center lg:justify-start items-center py-10">
        <div className="text-xl md:text-3xl lg:text-5xl font-normal text-black dark:text-white">
          Our <span className="text-brandColor">B</span>rand
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandData.map((brand) => (
          <ProductCard
            key={brand.id}
            name={brand.name}
            link={`/brands/${brand.id}`}
            imageUrl={brand.image ?? 'https://res.cloudinary.com/dkvqtc5pb/image/upload/v1737433308/products/1737433306032-taherul.PNG.png'}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;