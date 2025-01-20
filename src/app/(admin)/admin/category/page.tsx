import CategoryComponent from '@/components/Admin/Category/CategoryComponent'
import React from 'react'
import { prisma } from '../../../../../prisma/client'

const CategoryPage = async () => {

  const data = await prisma.category.findMany({
    include: {
      subcategories: true,
     
      }
    })




  return (
    <div>
      <CategoryComponent data={data} />
    </div>
  )
}

export default CategoryPage
