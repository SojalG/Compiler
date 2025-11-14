import React, { useState, useEffect } from 'react'
import newlogo from './assets/newlogo.png'
import cmpltlogo from './assets/cmplt-logo.png'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() =>{
    const handleScroll = () =>{
      if(window.scrollY > 60){
        setIsScrolled(true);
      }
      else{
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll',handleScroll);
    return() =>{
      window.removeEventListener('scroll',handleScroll);
    };
  },[]);
  const zIn = isScrolled ? 'z-30' : 'z-10';

  return (
    <header className={` relative sticky top-0 ${zIn} flex justify-between  items-center px-3 md:px-6 py-3 bg-[#061d3a]/80 text-white text-[16px] shadow-sm shadow-blue-900 `}>
     
      <a href="/compilein/" className='flex justify-center active:scale-95 items-center'>
      <img className='logo w-[22px] md:w-[38px]' src={newlogo} alt="logo" />
      <img className='logo w-[120px] md:w-[150px] mt-1' src={cmpltlogo} alt="logo" />
      </a>

      <nav className="flex space-x-2 md:space-x-10 ">
        <a href="#features" className=' hover:text-[#136be0] active:scale-90 transition-colors'>Features</a>
        <a href="#how_works" className='hover:text-[#136be0] active:scale-90 transition-colors'>How It Works</a>
      </nav>

        <a href="/compilein/compiler/" className='text-white inline-flex items-center px-4 py-3 cursor-pointer rounded-xl hover:bg-[#395eb2]/40 transition-colors bg-[#5773b2]/60  shadow-md shadow-black hover:shadow-lg hover:shadow-black active:scale-95'>Let’s Compile Your Code</a>
    </header>
  )
}

export default Header
