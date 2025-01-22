import ColorComponent from '@/components/Admin/Color/ColorComponent'
import React from 'react'
import { prisma } from '../../../../../prisma/client';

const ColorPage =async () => {
    const data = await prisma.color.findMany();
    console.log(data);
    
  return (
    <div>
      <ColorComponent />
    </div>
  )
}

export default ColorPage
