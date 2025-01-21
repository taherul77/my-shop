import { NextResponse } from "next/server";
import cloudinary from "../../../lib/cloudinaryConfig";
import { prisma } from "../../../../prisma/client";
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
    const title = formData.get("title") as string;
    const status = formData.get("status") || "ACTIVE";
    const file = formData.get("image") as File | null;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    let imagePath = "https://res.cloudinary.com/dkvqtc5pb/image/upload/v1737433308/products/1737433306032-taherul.PNG.png";

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${Date.now()}-${file.name}`;
      const uploadResult: any = await uploadToCloudinary(buffer, fileName);
      imagePath = uploadResult.secure_url;
    }

    const newBrand = await prisma.brand.create({
      data: {
        name,
        title,
        status: status.toString(),
        image: imagePath,
      },
    });

    return NextResponse.json({
      message: "Brand created successfully",
      result: newBrand,
    });
  } catch (error) {
    console.error("Error creating brand:", error);
    return NextResponse.json(
      { message: "Internal server error", result: null },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    // Delete the brand
    const deletedBrand = await prisma.brand.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({
      message: "Brand deleted successfully",
      result: deletedBrand,
    });
  } catch (error) {
    console.error("Error deleting brand:", error);
    return NextResponse.json(
      { message: "Internal server error", result: null },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export default function handler(req: Request) {
  if (req.method === 'POST') {
    return POST(req);
  } else if (req.method === 'DELETE') {
    return DELETE(req);
  } else {
    return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405 });
  }
}