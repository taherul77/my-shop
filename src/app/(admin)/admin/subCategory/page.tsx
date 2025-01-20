import SubCategoryComponent from '@/components/Admin/SubCategory/SubCategoryComponent'
import React from 'react'
import { prisma } from '../../../../../prisma/client'

const SubCategoryPage = async () => {
      const data = await prisma.subCategory.findMany();
      
  return (
    <div>
      <SubCategoryComponent data={data} />
    </div>
  )
}

export default SubCategoryPage
