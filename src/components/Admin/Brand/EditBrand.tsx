import React from 'react'
interface EditBrandProps {
  modalClose: () => void;
}

const EditBrand = ({modalClose}:EditBrandProps) => {
  return (
    <div>
      <button onClick={() => modalClose()}>Close</button>
    </div>
  )
}

export default EditBrand
