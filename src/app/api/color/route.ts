/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import multer from "multer";

type Status = "ACTIVE" | "INACTIVE";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("image");

export const config = {
  api: {
    bodyParser: false,
  },
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
    
    const contentType = req.headers.get("Content-Type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Content-Type must be multipart/form-data" },
        { status: 400 }
      );
    }

 
    await runMiddleware(req);

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const hexCode = formData.get("hexCode") as string;
    const status = (formData.get("status") as Status) || "ACTIVE";

    if (!name || !hexCode) {
      return NextResponse.json(
        { error: "Name and HexCode are required" },
        { status: 400 }
      );
    }

    const newColor = await prisma.color.create({
      data: {
        name,
        hexCode,
        status,
      },
    });

    return NextResponse.json({
      message: "Color created successfully",
      result: newColor,
    });
  } catch (error) {
    console.error("Error creating color:", error);
    return NextResponse.json(
      { message: "Internal server error", result: null },
      { status: 500 }
    );
  }
}
export async function GET() {
    try {
      const colors = await prisma.color.findMany();
      return NextResponse.json({
        message: "Colors fetched successfully",
        result: colors,
      });
    } catch (error) {
      console.error("Error fetching colors:", error);
      return NextResponse.json(
        { message: "Internal server error", result: null },
        { status: 500 }
      );
    }
  }