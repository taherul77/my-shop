import React from 'react'
interface EditColourProps {
  modalClose: () => void;
}

const EditColor = ({modalClose}:EditColourProps) => {
  return (
    <div>
      EditColor
      <button onClick={() => modalClose()}>Close</button>
    </div>
  )
}

export default EditColor
