import React from 'react'
interface AddColourProps {
  modalClose: () => void;
}

const AddColor = ({modalClose}:AddColourProps) => {
  return (
    <div>
      AddColor
      <button onClick={() => modalClose()}>Close</button>
    </div>
  )
}

export default AddColor
