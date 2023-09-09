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
        mobileMenueOpen ? (<RiCloseLine onClick={()=>{setMobileMenueOpen(false)}} className='h-6 w-6 text-white mr-2'/>) 
        : (<HiOutlineMenu onClick={()=>{setMobileMenueOpen(true)}} className='  h-6 w-6 text-white mr-2'/>)
      }
    </div>

    <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/100 to-[#483d8b] 
    backdrop-blur-lg z-10 md:hidden smooth-trasition 
    ${mobileMenueOpen ? 'left-0' : '-left-full'}`}>
      <img src={logo} alt='Logo' className='w-full h-14 object-contain' />
      <NavLinks handleClick={()=>{setMobileMenueOpen(false)}} />
    </div>


   </>
  )
}

export default Sidebar