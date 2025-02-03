import { prisma } from "../../prisma/client";


export const fetchBrandData = async () => {
  const brandData = await prisma.brand.findMany();
  const defaultImageUrl = 'https://res.cloudinary.com/dkvqtc5pb/image/upload/v1737433308/products/default-image.png';

  const updatedBrands = await Promise.all(
    brandData.map(async (brand) => {
      try {
        if (brand.image) {
          const response = await fetch(brand.image);
          if (response.status === 404) {
            return { ...brand, imageUrl: defaultImageUrl };
          }
          return { ...brand, imageUrl: brand.image };
        } else {
          return { ...brand, imageUrl: defaultImageUrl };
        }
      } catch  {
        return { ...brand, imageUrl: defaultImageUrl };
      }
    })
  );

  return updatedBrands;
};