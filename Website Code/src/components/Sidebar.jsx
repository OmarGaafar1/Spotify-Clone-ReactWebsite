import React, { useState } from 'react'
import {links} from '../assets/constants'
import { NavLink } from 'react-router-dom'
import {RiCloseLine} from 'react-icons/ri'
import {HiOutlineMenu} from 'react-icons/hi'
import {logo} from '../assets/'

const NavLinks = ({handleClick}) => {
  return (
    <div className='mt-10'>
      {links.map((link)=>{
        return (
          <NavLink className='flex flex-row my-8 
          justify-start items-center text-sm 
          font-meduim text-gray-400 hover:text-cyan-400'
          to={link.to}
          key={link.name}
          onClick={() =>{ handleClick && handleClick()}}
          > 
            <link.icon className='mr-2 h-6 w-6'></link.icon>
            {link.name}
          </NavLink>
        )
      })}
    </div>
  )
}

const Sidebar = () => {
  const [mobileMenueOpen , setMobileMenueOpen] = useState(false);


  return (
   <>
    <div className=" hidden md:flex  flex-col w-[240px] py-10 px-4 bg-[#191624]"> 
      <img src={logo} alt='Logo'  className='w-full h-14 object-contain'/>
      <NavLinks/>
    
    </div>


    <div className='absolute md:hidden  top-6 right-3'>
      {
        mobileMenueOpen ? (<RiCloseLine className='h-6 w-6 text-white mr-2'/>) 
        : (<HiOutlineMenu className='h-6 w-6 text-white mr-2'/>)
      }
    </div>

    <div className=" hidden md:flex  flex-col w-[240px] py-10 px-4 bg-[#191624]"> 
      <img src={logo} alt='Logo'  className='w-full h-14 object-contain'/>
      <NavLinks/>
    
    </div>
    
   </>
  )
}

export default Sidebar