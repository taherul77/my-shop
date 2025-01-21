import BrandComponent from '@/components/Admin/Brand/BrandComponent'
import React from 'react'
import { prisma } from '../../../../../prisma/client'

const BrandPage = async () => {


const data = await prisma.brand.findMany()

console.log(data);

  return (
    <div>
      <BrandComponent />
    </div>
  )
}

export default BrandPage
