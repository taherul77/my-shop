import Lottie from 'react-lottie';
import React from "react";
import loading from "../../../public/lottie/loading.json";

const MiniLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[25px] h-[25px]">
        <Lottie
          options={{ animationData: loading, loop: true }}
        />
      </div>
    </div>
  );
};

export default MiniLoader;
