import Image from "next/image";
import Link from "next/link";
import React from "react";

// export interface ProductDetails {
//     name: string;
//     imageUrl: string;
//     link:string;
//   }

const products = [
    {
      name: "KITCHEN AREA",
      imageUrl: "/category/category1.jpg",
      link: "/expertise/kitchen-area",
    },
    {
      name: "COUNTER TOP",
      imageUrl: "/category/catecory2.jpg",
      link: "/expertise/counter-top",
    },
    {
      name: "WARDROBES",
      imageUrl: "/category/category3.jpg",
      link: "/expertise/wardrobes",
    },
    {
      name: "WALK-IN CLOSETS",
      imageUrl: "/category/category4.jpeg",
      link: "/expertise/walk-in-closets",
    },
    {
      name: "VANITIES",
      imageUrl: "/category/category5.jpeg",
      link: "/expertise/vanities",
    },
    {
      name: "ACCESSORIES",
      imageUrl: "/category/category6.jpeg",
      link: "/expertise/accessories",
    },
  ];

const ResponsiveCategory = () => {
  return (
    <div className="container mx-auto">
			<div className="text-4xl font-normal text-text pb-8">
				Our <span className="text-brandColor">E</span>xpertise
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{products.map((product, index) => {
					return (
						
							<Link href={product.link} key={index}>
								<div key={index} className="relative cursor-pointer">
									<Image
										src={product.imageUrl}
										alt="Kitchen"
										width={343}
										height={200}
										className="w-full h-auto"
									></Image>
									<div className="absolute inset-0 z-10 bg-brandColorSecondary opacity-40" />
									<div className="absolute inset-0 z-20 text-backgroundColor font-bold text-3xl flex justify-center items-center">
										{product.name}
									</div>
								</div>
							</Link>
						
					);
				})}
			</div>
		</div>
  )
}

export default ResponsiveCategory
