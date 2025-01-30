import React from "react";
import HomeBanner from "./HomeBanner/HomeBanner";
import ResponsiveHomePage from "./HomeBanner/ResponsiveHomePage";

import Category from "./Category/Category";
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
        <div className="hidden lg:block ">
          <Category />
        </div>
      </div>
      
    </>
  );
};

export default Home;
