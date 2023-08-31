import React from 'react'

import { loader } from '../assets'
const Loader = ({title}) => {
  return (
    <div className='w-full flex justify-center items-center flex-col' >\

      <img src={loader} className='w-32 h-32 object-contain'/>

      <h1 className='font-bold text-xl text-white mt-2'>{title || "Loading ..."}</h1>
    
    </div>
  )
}

export default Loader