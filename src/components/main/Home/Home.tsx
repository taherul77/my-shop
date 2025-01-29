import React from "react";
import HomeBanner from "./HomeBanner/HomeBanner";
const Home = () => {
  return (
    <div className="flex flex-col gap-20 ">
      <div className="hidden lg:block">
        <HomeBanner />
      </div>
      
    </div>
  );
};

export default Home;
