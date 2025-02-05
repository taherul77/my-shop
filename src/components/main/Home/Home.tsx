import React from "react";
import HomeBanner from "./HomeBanner/HomeBanner";
import ResponsiveHomePage from "./HomeBanner/ResponsiveHomePage";

import Category from "./Category/Category";
import ResponsiveCategory from "./ResponsiveCategory/ResponsiveCategory";
import Brand from "./Brand/Brand";
const Home = () => {
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
          <Category />
        </div>

        <div className="lg:hidden md:block">
          <ResponsiveCategory />
        </div>
      </div>
    </>
  );
};

export default Home;
