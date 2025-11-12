import React from 'react'
import images1 from './assets/image.png'
import images2 from './assets/Human-Robot.jpeg'
import images4 from './assets/image2.png'
import AnimatedContent from './components/AnimatedContent'
// import images3 from './assets/Screenshot 2025-11-07 220417.png'
const featuresList = [
   {
      title: "AI powered debugging" ,
      description: "Real-time error ananlysis, explanations, and fix suggestions as you type" ,
      img:images4
   },
   {
      title: "Zero Setup, Anywhere",
      description: "No installs or version headaches - just opes in your browser.",
      img:images2
   },
   {
      title: "Smart Autocomplete",
      description: "Context-aware code completion to speed up writing and reduce bugs.",
      img:images1
   },
   {
      title: "Cloud-Based Compilation",
      description: "Secured the user data in a MongoDB cloud databse , ensuring persistence, scalability, and quick access.",
      img:images1
   },
   {
      title: "Real-Time Execution",
      description: "Compile and run code instantly with cloud-backed performance.",
      img:images1
   }
];
const Features = () => {
  return (
    <div id='features' className='py-[150px] flex-col items-center justify-center'>

      <h1 className='text-[40px] font-bold mb-3 md:mb-8 text-cyan-500 hover:text-cyan-600 text-center'>FEATURES</h1>
      <div className='md:flex flex-col gap-20'>
         {featuresList.map((feature,index) =>{
            const isOdd = index%2 !== 0;

            return(
// animationnnn
               <AnimatedContent
              key={feature.title}
              distance={40} 
              direction="vertical" 
              reverse={isOdd} 
              duration={2.0}
              ease="power2.out" 
              initialOpacity={.1}
              animateOpacity
              scale={.95}
              threshold={0.3} 
            //   delay={index * 0.5} 
            >
               <div key={feature.title} className={`flex flex-col md:flex-row items-center gap-20 p-6 h- bg-[#] animate-fade-in ease- animation-y-1 tranform rounded-xl  ${isOdd ? 'md:flex-row-reverse' : ''}`}>
                  
{/* IMAGE */}
                  <div className='flex  justify-center'>
                     <img className= {`w-full h-auto object-cover rounded-full max-w-xl  shadow-[0_0_15px_rgba(58,163,216,0.3)] hover:shadow-[0_0_15px_rgba(58,163,216,0.35)] ${isOdd ?  
                     'md:mr-[150px]' 
                     : ' md:ml-[150px]'}`
                     }src={feature.img} alt ={feature.title}/>
                  </div>

{/* TEXT */}
         <div className={` flex relative flex-col hover:bg-[#5799b9] w-[400px] h-[400px] p-2 justify-center gap-3 item-center rounded-full bg-[#4a8daf] ${isOdd 
                  ? 'md:ml-[200px]'  
                  : 'md:mr-[200px]'  
                     }`}>
               {/*BLOB-1 ANIMATION  */}
               <div 
                  className={`
                    absolute  
                    w-[50%] h-[35%] 
                    top-0  
                    bg-[#24beff]/80 
                    filter blur-3xl opacity-40
                    ${isOdd ? 'right-0 -mr-1/4' :'left-0 -ml-1/4'}
                    rounded-[10%_60%_70%_30%_/_40%_70%_30%_60%]
                    opacity-60 
                    animate-blob 
                    `}
                    style={{ animationDelay: `${index * 1.5}s` }} 
               ></div>
               {/*BLOB-2 ANIMATION  */}
               <div 
                  className={`
                    absolute  
                    w-[30%] h-[45%] 
                    top-1/4 right-0 
                    ${isOdd ? 'left-0 -ml-1/4' :'right-0 -mr-1/4'}
                    bg-green-300/90 
                    filter blur-3xl opacity-40
                    -mt-1/4 -mr-1/4
                    rounded-[10%_60%_70%_30%_/_40%_70%_30%_60%] 
                    animate-blob 
                    `}
                    style={{ animationDelay: `${index * 1.5}s` }} 
               ></div>
               {/*BLOB-3 ANIMATION  */}

                  <div 
                     className={`
                        absolute 
                     w-[50%] h-[25%]
                        bottom-0 
                        -mb-1/4 
                        ${isOdd ? ' right-0 -mr-1/4' : ' left-0 -ml-1/4'}
                        bg-[#4b2c3b]/50 
                        filter blur-2xl opacity-80 
                        rounded-[30%_70%_50%_50%_/_70%_30%_70%_30%]
                        `}
                       
                        style={{ animationDelay: `${(index * 1.5) - 10}s` }} 
                  ></div>


                     <div className='relative z-10 p-6 text-center'>
                        <h2 className='text-2xl font-bold mb-4 text-center'>{feature.title}</h2>
                     <p className='text-[17px] text-center'>{feature.description}</p>
                     </div>
         </div>
               </div>
               </AnimatedContent>
            );
         })}
        
         
      </div>

    </div> 
  )
}

export default Features