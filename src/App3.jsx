
import Header from './Header'
import Features from './Features'
import How_It_Works from './How_It_Works'
import img_ from './assets/robot.jpeg'
import Footer from './Footer'
import arrow from './assets/arrow_right.png'
import Aurora from './components/Aurora'

function App() {
  return (
    <div className='relative bg-[#071530] text-white min-h-screen'>
      <Header/> 
      <div className='flex relative flex-col md:flex-row items-center justify-center gap-20 max-w-8xl mx-auto py-16 px-7 z-0'>
            <div className='fixed inset-0 w-full h-full -z-10 opacity-100'>
            {/* animation AURORA */} 
            <Aurora
              colorStops={["#1d4050", "#11357c", "#1c2e52"]}
              blend={0.5}
              amplitude={1.0}
              speed={1}
              />
            </div>

          <div className='flex  w-[%] p-6 md:p-12 '>
            <div className='p-[100px] flex-1'>
              <h1 className="text-6xl flex md:text-7xl font-bold ">Compile<span className='text-[#0178da]'>IN</span></h1>

              <p className='text-[20px] flex md:text-xl text-gray-400 mt-10 '> Code Smarter, Debug Faster — in the Cloud and Enjoy the new Collaboration Experience of AI</p>
              <a href="/compilein/" className='text-white inline-flex items-center px-4 py-3 mt-6 rounded-xl hover:bg-[#2879a8] transition-colors bg-[#3194ce]  shadow-md shadow-black hover:shadow-lg hover:shadow-black active:scale-95 '>Start Coding Now <img className="
              " src={`${arrow}`} alt="" /> </a>
            </div>
          </div>
          <img className="flex justify-center shadow-[0_0_15px_rgba(58,163,216,0.3)] hover:shadow-[0_0_15px_rgba(58,163,216,0.4)] w-[500px] mr-[10%] mt-10 rounded-full  animate-float ease-in-out" src={img_} alt="" />
      </div>
      <Features/>
      <How_It_Works/>
      <Footer/>
    </div>
  )
}

export default App
