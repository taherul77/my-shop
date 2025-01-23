import SubCategoryComponent from '@/components/Admin/SubCategory/SubCategoryComponent'
import React from 'react'
import { prisma } from '../../../../../prisma/client'

const SubCategoryPage = async () => {
      const data = await prisma.subCategory.findMany();
      
  return (
    <>
      <div className="flex min-h-screen flex-col items-center px-6">
      <div className=" max-w-7xl flex flex-col gap-5 w-full py-4">
      <SubCategoryComponent data={data} />
      </div>
    </div>
     
    </>
  )
}

export default SubCategoryPage
