import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import nextConnect from "next-connect";


type Status = "ACTIVE" | "INACTIVE";

// Configure multer for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("image");

// Create an instance of nextConnect
const handler = nextConnect();

// Use multer middleware with nextConnect
handler.use(uploadMiddleware);

export const config = {
  api: {
    bodyParser: false, // Disable body parsing by Next.js
  },
};

// POST Handler
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Content-Type must be multipart/form-data" }, { status: 400 });
    }

    // Now we can access `req` and `res` via `nextConnect` handler
    await handler(req);

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const hexCode = formData.get("hexCode") as string;
    const status = (formData.get("status") as Status) || "ACTIVE";

    if (!name || !hexCode) {
      return NextResponse.json({ error: "Name and HexCode are required" }, { status: 400 });
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
    return NextResponse.json({ message: "Internal server error", result: null }, { status: 500 });
  }
}

// GET Handler
export async function GET() {
  try {
    const colors = await prisma.color.findMany();
    return NextResponse.json({
      message: "Colors fetched successfully",
      result: colors,
    });
  } catch (error) {
    console.error("Error fetching colors:", error);
    return NextResponse.json({ message: "Internal server error", result: null }, { status: 500 });
  }
}
