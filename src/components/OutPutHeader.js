import React, { useState } from 'react'

function OutPutHeader({ isChecked, changeCheckBoxValue } ) {

  
  return (
    <div className='item__header output'>
        <h3>editor</h3>
        <div>
       <input type='checkbox' id='slide-checkbox'  checked={isChecked}  onChange={changeCheckBoxValue}/>
       <label htmlFor="slide-checkbox">Slide 	&amp; Compare</label>
       </div>
    </div>
  )
}

export default OutPutHeader