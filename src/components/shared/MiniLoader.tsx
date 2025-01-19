import Lottie from 'react-lottie';
import React from "react";
import loading from "../../../public/lottie/loading.json";

const MiniLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie
        animationData={loading}
        loop={true}
        className="w-[25px] h-[25px]"
      />
    </div>
  );
};

export default MiniLoader;
