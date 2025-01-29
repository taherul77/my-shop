import React from 'react'

interface EditSubCategoryProps {
  modalClose: () => void;
}
const EditCategory = ({modalClose: _modalClose}:EditSubCategoryProps) => {
  return (
    <div>
      <button onClick={() => _modalClose()}>Close</button>
    </div>
  )
}

export default EditCategory
