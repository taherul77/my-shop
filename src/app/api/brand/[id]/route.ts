import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinaryConfig";
import { prisma } from "../../../../../prisma/client";
import { Readable } from "stream";

interface CloudinaryUploadResult {
  secure_url: string;
  // Add other properties if needed
}

type Status = "ACTIVE" | "INACTIVE"; // Define the Status type

const uploadToCloudinary = async (fileBuffer: Buffer, publicId: string): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "brands", public_id: publicId, resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as CloudinaryUploadResult);
      }
    );

    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

export async function PATCH(req: Request) {
  try {
    const formData = await req.formData();
    const id = parseInt(formData.get("id") as string, 10);
    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const status = formData.get("status") as Status || "ACTIVE";
    const file = formData.get("image") as File | null;

    if (!id) {
      return NextResponse.json(
        { error: "Brand ID is required for editing" },
        { status: 400 }
      );
    }

    let imagePath = null;

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${Date.now()}-${file.name}`;
      const uploadResult = await uploadToCloudinary(buffer, fileName);
      imagePath = uploadResult.secure_url;
    }

    const updatedBrand = await prisma.brand.update({
      where: { id },
      data: {
        name,
        title,
        status,
        ...(imagePath && { image: imagePath }), 
      },
    });

    return NextResponse.json({
      message: "Brand updated successfully",
      result: updatedBrand,
    });
  } catch (error) {
    console.error("Error updating brand:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}