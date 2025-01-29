import { Card, CardContent } from "@/components/ui/finishCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/homePageCarousel";
import Image from "next/image";
import Link from "next/link";

const data = [
  "/homePage/banner2.jpg",
  "/homePage/banner3.jpg",
  "/homePage/banner4.jpg",
    "/homePage/banner5.jpg",
    "/homePage/banner6.webp",
 
];
const HomeBanner = () => {
  return (
    <>
    <div className="grid grid-cols-5 bg-brandColorSecondary relative h-full ">
      <div className="col-span-2" />

      <div className="col-span-3 ">
        <div>
          <Carousel>
            <CarouselContent>
              {data.map((image: string, index: number) => {
                return (
                  <CarouselItem key={index}>
                    <div>
                      <Card>
                        <CardContent>
                          <div className="h-full w-full overflow-hidden relative">
                            <Image
                              className="h-full w-full object-cover"
                              src={image}
                              alt={image}
                              width={1097}
                              height={860}
                            />
                            <div className="absolute h-full w-[287px] left-[-114px] top-0 bottom-0 bg-gradient-to-r from-gradientColorOne to-transparent z-10"></div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <div className="absolute z-20 bottom-[28px] -left-[27px]">
              <CarouselPrevious className="w-[3.8rem] h-[3.5rem] -left-[33px] hover:bg-[#EBEBEB] " />
              <CarouselNext className="w-[3.8rem] h-[3.5rem] right-[16px]" />
            </div>
          </Carousel>
        </div>
      </div>

      <div className="absolute inset-0 h-full w-full ">
        <div className="container h-full flex justify-start items-start">
          <div className="flex flex-col gap-10 mt-40">
            <div>
              <div className="text-7xl font-bold text-backgroundColor">
                Designs That Define <br />
                Your Space
              </div>
            </div>

            <div>
              <div className="text-lg font-normal text-backgroundColor">
                Discover versatile creations tailored to reflect your <br />
                style and enhance your everyday life.
              </div>
            </div>

            
            <Link href={'/products'}>
            <div
              className=" 
      w-1/2 text-center text-xl py-4 px-10
      border border-[#939494] text-[#939494]
      hover:bg-backgroundColor hover:text-textSecondary hover:border-backgroundColor
        opacity-95 transition-all duration-200 cursor-pointer"
            >
              View Our Collection
            </div>
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  </>
  )
}

export default HomeBanner
