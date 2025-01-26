/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from "next/server";
import cloudinary from "../../../lib/cloudinaryConfig";
import { prisma } from "../../../../prisma/client";
import multer from "multer";
import { Readable } from "stream";

type Status = "ACTIVE" | "INACTIVE";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("image");

export const config = {
  api: {
    bodyParser: false,
  },
};

// Upload file to Cloudinary
const uploadToCloudinary = async (fileBuffer: Buffer, publicId: string) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "products", public_id: publicId, resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

// Middleware to handle file upload
const runMiddleware = (req: Request) =>
  new Promise((resolve, reject) => {
    uploadMiddleware(req as any, {} as any, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(null);
    });
  });

export async function POST(req: Request) {
  try {
    await runMiddleware(req);

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const categoryId = parseInt(formData.get("categoryId") as string, 10);
    const subCategoryId = formData.get("subCategoryId")
      ? parseInt(formData.get("subCategoryId") as string, 10)
      : null;
    const status = formData.get("status") as Status || "ACTIVE";
    const file = formData.get("image") as File | null;
    const brandId = parseInt(formData.get("brandId") as string, 10);
    const colorIds = formData.getAll("colorIds[]") as string[]; 

    if (!name || !description || !price || !categoryId || !brandId) {
      return NextResponse.json(
        { message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    let imagePath = null;

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${Date.now()}-${file.name}`;
      const uploadResult: any = await uploadToCloudinary(buffer, fileName);
      imagePath = uploadResult.secure_url;
    }

    // Create the product
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        categoryId,
        subCategoryId,
        status,
        imagePath,
        brandId
      },
    });

    // Create the associations in the ProductColor table
    if (colorIds.length > 0) {
      const productColors = colorIds.map(colorId => ({
        productId: newProduct.id,
        colorId: parseInt(colorId, 10),
      }));

      await prisma.productColor.createMany({
        data: productColors,
      });
    }

    return NextResponse.json({
      message: "Product created successfully",
      result: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Internal server error", result: null },
      { status: 500 }
    );
  }
}
