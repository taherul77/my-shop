import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinaryConfig";
import { prisma } from "../../../../../prisma/client";
import { Readable } from "stream";

// Helper function to upload an image to Cloudinary
const uploadToCloudinary = async (fileBuffer: Buffer, publicId: string) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "brands", public_id: publicId, resource_type: "auto" },
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

export async function PATCH(req: Request) {
  try {
    const formData = await req.formData();
    const id = parseInt(formData.get("id") as string, 10);
    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const status = formData.get("status") || "ACTIVE";
    const file = formData.get("image") as File | null;

    if (!id) {
      return NextResponse.json(
        { error: "Brand ID is required for editing" },
        { status: 400 }
      );
    }

    let imagePath = null;

    // If a new image is provided, upload it to Cloudinary
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${Date.now()}-${file.name}`;
      const uploadResult: any = await uploadToCloudinary(buffer, fileName);
      imagePath = uploadResult.secure_url;
    }

    // Update brand in the database
    const updatedBrand = await prisma.brand.update({
      where: { id },
      data: {
        name,
        title,
        status,
        ...(imagePath && { image: imagePath }), // Only update image if provided
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
