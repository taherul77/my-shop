import React from "react";
import HomeBanner from "./HomeBanner/HomeBanner";
import ResponsiveHomePage from "./HomeBanner/ResponsiveHomePage";
import WorldMapComponent from "./WorldMapComponent/WorldMapComponent";
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
      <div className="flex flex-col items-center px-6">
        <div className=" max-w-7xl flex flex-col gap-5 w-full ">
          <WorldMapComponent />
        </div>
      </div>
    </>
  );
};

export default Home;
