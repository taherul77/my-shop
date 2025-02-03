import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  imageUrl: string;
  link: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, imageUrl, link }) => {
  return (
    <Link href={link}>
      <div className="group col-span-1 h-[20rem] overflow-hidden cursor-pointer relative text-backgroundColor">
        <Image
          src={imageUrl}
          alt={name}
          height={296}
          width={504}
          style={{ objectFit: "cover" }}
          className="absolute w-full h-full object-cover top-0 left-0 transition-opacity duration-300 ease-out"
        />
        <div className="absolute w-full h-full bg-text opacity-0 z-10 transition-opacity duration-200 ease-out lg:group-hover:opacity-60"></div>
        <div className="flex justify-center items-center absolute lg:bottom-[-10px] left-[50%] translate-x-[calc(-50%)] transition-bottom duration-300 ease-out z-30 lg:group-hover:bottom-[40%] max-lg:h-full max-lg:items-end max-lg:pb-4">
          <div className="text-lg md:text-2xl xl:text-3xl 2xl:text-4xl font-bold z-6 whitespace-nowrap uppercase text-backgroundColor lg:group-hover:opacity-70 max-lg:text-3xl">
            {name}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;