import React from "react";
import HomeBanner from "./HomeBanner/HomeBanner";
const Home = () => {
  return (
    <>
      <div className="flex flex-col ">
        <div className="hidden lg:block">
          <HomeBanner />
        </div>
      </div>
      <div className="flex flex-col items-center px-6">
        <div className=" max-w-7xl flex flex-col gap-5 w-full py-4">hi</div>
      </div>
    </>
  );
};

export default Home;
