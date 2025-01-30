
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/client";

export async function GET(request: NextRequest, { params }: any) {
  const { categoryId } = params;

  try {
    const subCategories = await prisma.subCategory.findMany({
      where: {
        categoryId: parseInt(categoryId),
      },
    });
    return NextResponse.json(subCategories, { status: 200 });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return NextResponse.json(
      { error: "Error fetching subcategories" },
      { status: 500 }
    );
  }
}
