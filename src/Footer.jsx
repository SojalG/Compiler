
import newlogo from './assets/newlogo.png'
import cmpltlogo from './assets/cmplt-logo.png' 
const Footer = () => {
  return (
    <footer className='top-0 flex flex-row py-5 px-9 justify-between relative items-center bg-[#0a224c] shadow-sm shadow-blue-900 '>
      
        {/* LOGO */}
        <a href='' className={`flex active:scale-95` }>
              <img className='logo w-[22px] md:w-[30px] md:h-[40px]' src={newlogo} alt="logo" />
              <img className='logo w-[120px] md:w-[110px] md:h-[38px] mt-1 ' src={cmpltlogo} alt="logo" />
        </a>
        <div className=' text-gray-400 text-[14px]'>
        <p> &copy; 2025 CompileIn. All rights reserved. | Terms | Privacy </p>
        </div>
        <div className='flex md:gap-8 gap-3 text-gray-400 text-[14px] '>
        <a href="https://leetcode.com/"className="hover:text-[#3194ce] active:scale-95 transition-colors" target="_blank">Leetcode</a>
        <a href="https://github.com" className="hover:text-green-400 active:scale-95 transition-colors"    target="_blank">GitHub</a>
        <a href="https://linkedin.com" className="hover:text-[#3194ce] active:scale-95  transition-colors" target="_blank">LinkedIn</a>
      </div>
      
    </footer>
  )
}

export default Footer