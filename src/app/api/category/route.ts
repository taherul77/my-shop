/* eslint-disable no-unused-vars */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/client';

export async function POST(request: NextRequest) {
  const body = await request.json();
 

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

export async function PATCH(request: NextRequest) {
  const body = await request.json();


  try {
    if (body.id) {
      if (body.parentId) {
        // Update a subcategory
        const updatedSubCategory = await prisma.subCategory.update({
          where: { id: body.id },
          data: {
            name: body.name,
            title: body.title,
            status: body.status || 'ACTIVE',
            categoryId: body.parentId,
          },
        });
        return NextResponse.json(updatedSubCategory, { status: 200 });
      } else {
        // Update a category
        const updatedCategory = await prisma.category.update({
          where: { id: body.id },
          data: {
            name: body.name,
            title: body.title,
            status: body.status || 'ACTIVE',
          },
        });
        return NextResponse.json(updatedCategory, { status: 200 });
      }
    } else {
      return NextResponse.json({ error: 'ID is required for updating' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating category or subcategory:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error updating category or subcategory' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { id, isSubCategory } = await request.json();
 
  try {
    if (!id) {
      return NextResponse.json({ error: 'ID is required for deletion' }, { status: 400 });
    }

    if (isSubCategory) {
      // Delete a subcategory
      const deletedSubCategory = await prisma.subCategory.delete({
        where: { id },
      });
      return NextResponse.json(deletedSubCategory, { status: 200 });
    } else {
      // Delete a category
      const deletedCategory = await prisma.category.delete({
        where: { id },
      });
      return NextResponse.json(deletedCategory, { status: 200 });
    }
  } catch (error) {
    console.error('Error deleting category or subcategory:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error deleting category or subcategory' }, { status: 500 });
  }
}
