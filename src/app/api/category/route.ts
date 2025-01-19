import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/client';

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  try {
    if (body.parentId) {
      // Create a subcategory
      const newSubCategory = await prisma.subCategory.create({
        data: {
          name: body.name,
          title: body.title,
          status: body.status || 'ACTIVE',
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
          status: body.status || 'ACTIVE',
        },
      });
      return NextResponse.json(newCategory, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating category or subcategory:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error creating category or subcategory' }, { status: 500 });
  }
}



export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subcategories: true,
        products: true,
      },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error fetching categories' }, { status: 500 });
  }
}