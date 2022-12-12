import React from 'react'

const Dice = ({num,id,holdId,isHeld}) => {
  return (
    <div onClick={()=>holdId(id)} className={`dice ${isHeld ? "hold" : ""}`}>
        {num}
    </div>
    
  )
}

export default Dice