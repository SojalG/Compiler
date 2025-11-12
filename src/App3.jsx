
import Header from './Header'
import Features from './Features'
import How_It_Works from './How_It_Works'
import img_ from './assets/robot.jpeg'
import Footer from './Footer'
function App3() {
  return (
    <div className=' bg-[#071530] text-white min-h-screen'>
      
    <div className=''>
    <Header/>
    
    <div className='flex flex-col md:flex-row items-center justify-center gap-20 max-w-6xl mx-auto py-16 px-6'>
    
{/* TEXT */}
      <div className='p-[50px] flex-1'>
        <h1 className="text-6xl flex-2 md:text-8xl font-bold text-gray-300">Compile<span className='text-[#0178da]'>IN</span></h1>

        <p className='text-[20px] flex md:text-xl text-gray-400 mt-10 '> Code Smarter, Debug Faster — in the Cloud and Enjoy the new Collaboration Experience of AI</p>

      <a href="/compilein/" className='text-white inline-flex items-center px-4 py-3 mt-6 rounded-xl hover:bg-[#2879a8] transition-colors bg-[#3194ce]  shadow-md shadow-black hover:shadow-lg hover:shadow-black active:scale-95 '>Start Coding Now -{'>'} </a>
{/* BUTTONS */}
      {/* <div className='flex justify-right gap-[50px] py-10'>
         <button className='login-button border-solid border-white hover:text-[#10579b] active:text-[#136cc1]'>Login</button>
         <button className='signup-button border border-solid border-gray-600 w-[80px] h-[30px] bg-[#0d4377] rounded-xl
         transition duration-150 hover:bg-[#10579b] hover:shadow-md hover:shadow-black active:scale-95 active:bg-[#136cc1]'>Sign Up</button>
      </div> */}

{/* IMAGE */}
      </div>
        <img className="flex-1 shadow-[0_0_15px_rgba(58,163,216,0.3)] hover:shadow-[0_0_15px_rgba(58,163,216,0.4)] w-[500px] rounded-full  animate-float ease-in-out" src={img_} alt="" />
      </div>


      <Features/>
      <How_It_Works/>
      <Footer/>
    </div>
    </div>
  )
}

export default App3;
