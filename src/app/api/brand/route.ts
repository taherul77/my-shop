import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/client';

export async function POST(req: Request) {
    const { name, title, status } = await req.json();

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
  
    try {
   
      const newBrand = await prisma.brand.create({
        data: {
          name,
          title,
          status: status || 'ACTIVE',
        },
      });
  
      return NextResponse.json(newBrand, { status: 201 });
    } catch (error) {
      console.error('Error creating brand:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
