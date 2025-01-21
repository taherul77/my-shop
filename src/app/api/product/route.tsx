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
    const status = formData.get("status") || "ACTIVE";
    const file = formData.get("image") as File | null;

    if (!name || !description || !price || !categoryId) {
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

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        categoryId,
        subCategoryId,
        status: status.toString(),
        imagePath,
      },
    });

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




export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
 

  try {
    if (!id) {
      return NextResponse.json({ error: 'ID is required for deletion' }, { status: 400 });
    }

   
      const deletedProduct = await prisma.product.delete({
        where: { id },
      });
      return NextResponse.json(deletedProduct, { status: 200 });
    }
   catch (error) {
    console.error('Error deleting category or subcategory:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error deleting category or subcategory' }, { status: 500 });
  }
}


// // Handle Product Deletion (DELETE)
// export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { id } = req.query;

//     if (!id) {
//       return res.status(400).json({ message: "Product ID is required" });
//     }

//     await prisma.product.delete({
//       where: { id: parseInt(id as string, 10) },
//     });

//     res.status(200).json({
//       message: "Product deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }
