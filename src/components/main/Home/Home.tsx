import React from "react";
import HomeBanner from "./HomeBanner/HomeBanner";
import ResponsiveHomePage from "./HomeBanner/ResponsiveHomePage";

import Category from "./Category/Category";
import ResponsiveCategory from "./ResponsiveCategory/ResponsiveCategory";
import Brand from "./Brand/Brand";

import { GetServerSideProps } from "next";
import { fetchBrandData } from "@/lib/fetchBrandData";
import { ProductDetails } from "@/types";
export const getServerSideProps: GetServerSideProps = async () => {
  const brandsWithImages = await fetchBrandData();
  return {
    props: {
      brandsWithImages,
    },
  };
};




const Home = ({ brandsWithImages }: { brandsWithImages: ProductDetails[] }) => {
  return (
    <>
      <div className="flex flex-col ">
        <div className="hidden lg:block">
          <HomeBanner />
        </div>
        <div className="lg:hidden block">
          <ResponsiveHomePage />
        </div>
        <div className="hidden lg:block  py-10">
          <Brand />
        </div>
        <div className="hidden lg:block  py-10">
        <Category brandsWithImages={brandsWithImages} />
        </div>

        <div className="lg:hidden md:block">
          <ResponsiveCategory />
        </div>
      </div>
    </>
  );
};

export default Home;
