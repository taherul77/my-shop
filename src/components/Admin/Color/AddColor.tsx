import React from 'react'
interface AddColourProps {
  modalClose: (open: boolean) => void;
}

const AddColor = ({modalClose}:AddColourProps) => {
  return (
    <div>
      AddColor
      <button onClick={() => modalClose(false)}>Close</button>
    </div>
  )
}

export default AddColor
