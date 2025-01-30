import ProductCard from "./ProductCard";

export interface ProductDetails {
  name: string;
  imageUrl: string;
  link: string;
}

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

const Category = () => {
  return (
    <div className="container max-auto max-w-6xl">
      <div className="flex justify-center lg:justify-start items-center py-10">
        <div className="text-xl md:text-3xl lg:text-5xl font-normal text-black dark:text-white">
          Our <span className="text-brandColor">C</span>ategory
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: ProductDetails, index: number) => (
          <ProductCard
            key={index}
            name={product.name}
            link={product.link}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;