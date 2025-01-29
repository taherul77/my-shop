import Image from "next/image";
import React from "react";
const mobile = "/homePage/banner3.jpg";

const ResponsiveHomePage = () => {
  return (
    <div>
      <div className="bg-brandColorSecondary h-full pb-12 relative">
        {/* <div>
          <Image
            src={mobile}
            alt="Responsive"
            width={375}
            height={308}
            className="   w-full h-auto"
          ></Image>
        </div> */}
        <div className="relative z-10">
          <Image
            src={mobile}
            alt="Responsive"
            width={1097}
            height={860}
            className="w-full h-auto"
          ></Image>
          <div
            className=" absolute inset-0 z-20  
                  bg-gradient-to-b from-transparent from-70% to-brandColorSecondary to-100%
                  "
          ></div>
        </div>

        <div className="flex flex-col gap-6 relative h-[375px]">
          <div className="h-[375px]  top-10 bottom-10 bg-gradient-to-r from-gradientColorOne to-transparent z-10"></div>

          <div className="flex flex-col gap-3 text-backgroundColor text-5xl md:text-[56px] font-bold px-4 z-10 absolute -top-[70px]">
            <p>Designs</p>
            <p>That</p>
            <p>Define</p>
            <p>Your Space</p>
          </div>

          <div className="text-backgroundColor text-lg md:text-[22px] font-normal px-4">
            Discover versatile creations tailored <br /> to reflect your style
            and enhance your everyday life.
          </div>

          <div className="px-12 mt-4">
            <div
              className="w-full text-center text-xl py-4 px-10
          border border-[#939494] text-[#939494] hover:bg-backgroundColor hover:text-textSecondary hover:border-backgroundColor opacity-95 transition-all duration-200 cursor-pointer"
            >
              View Our Collection
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveHomePage;
