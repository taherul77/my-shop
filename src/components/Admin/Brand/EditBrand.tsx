import React from 'react'
interface EditBrandProps {
  modalClose: (open: boolean) => void;
}

const EditBrand = ({modalClose}:EditBrandProps) => {
  return (
    <div>
      <button onClick={() => modalClose(false)}>Close</button>
    </div>
  )
}

export default EditBrand
