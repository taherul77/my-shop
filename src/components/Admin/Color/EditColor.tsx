import React from 'react'
interface EditColourProps {
  modalClose: (open: boolean) => void;
}

const EditColor = ({modalClose}:EditColourProps) => {
  return (
    <div>
      EditColor
      <button onClick={() => modalClose(false)}>Close</button>
    </div>
  )
}

export default EditColor
