import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/client';

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  try {
    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        categoryId: body.categoryId,
        subCategoryId: body.subCategoryId || null,
        status: body.status || 'ACTIVE',
      },
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error creating product' }, { status: 500 });
  }
}