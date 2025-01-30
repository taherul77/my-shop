
import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinaryConfig";
import { prisma } from "../../../../../prisma/client";
import multer from "multer";
import { Readable } from "stream";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("image");

export const config = {
  api: {
    bodyParser: false, 
  },
};

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

// Handle Product Update (PUT)
export async function PUT(req: Request) {
  try {
    await runMiddleware(req);

    const body = await req.formData(); // Extract form data
    const id = body.get("id") as string;
    const name = body.get("name") as string;
    const description = body.get("description") as string;
    const price = body.get("price") as string;
    const categoryId = body.get("categoryId") as string;
    const subCategoryId = body.get("subCategoryId") as string;
    const status = body.get("status") as string;
    const file = body.get("image") as File;

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required" },
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

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        description,
        price: price ? parseFloat(price) : undefined,
        categoryId: categoryId ? parseInt(categoryId, 10) : undefined,
        subCategoryId: subCategoryId ? parseInt(subCategoryId, 10) : undefined,
        status,
        ...(imagePath && { imagePath }),
      },
    });

    return NextResponse.json({
      message: "Product updated successfully",
      result: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}




