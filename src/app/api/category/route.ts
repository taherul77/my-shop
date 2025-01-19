import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/client';

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  try {
    if (body.parentId) {
      const newSubCategory = await prisma.subCategory.create({
        data: {
          name: body.name,
          title: body.title,
          categoryId: body.parentId,
        },
      });
      return NextResponse.json(newSubCategory, { status: 201 });
    } else {
      // Create a category
      const newCategory = await prisma.category.create({
        data: {
          name: body.name,
          title: body.title,
        },
      });
      return NextResponse.json(newCategory, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating category or subcategory:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error creating category or subcategory' }, { status: 500 });
  }
}