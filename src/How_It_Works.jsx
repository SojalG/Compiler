
import AnimatedContent from './components/AnimatedContent'
import chat from './assets/chat.png'
import error from './assets/error.png'
import mode from './assets/mode.png'
import lang from './assets/lang.png'
import cld from './assets/cloud-i.png'
import frnd from './assets/frnd.png'
const points = [
  {
    title: 'AI Chatbot',
    shortDescription: 'Instant, conversational error explanations.',
    longDescription: 'Get step-by-step explanations for your errors. Our chatbot breaks down complex problems into simple, understandable guidance.',
    icon:chat
  },
  {
    title: 'Simple Errors',
    shortDescription: 'Error messages you can actually understand.',
    longDescription: 'We translate confusing compiler jargon into plain English, so you get clear guidance on what went wrong and how to fix it.',
    icon:error
  },
  {
    title: 'AI Mode Switch',
    shortDescription: 'Toggle real-time code suggestions.',
    longDescription: 'Enable intelligent code suggestions and autocompletion when you need a boost, or toggle it off for a distraction-free experience.',
    icon:mode
  },
  {
    title: 'Multi-Language',
    shortDescription: 'One compiler for all your languages.',
    longDescription: 'Seamlessly switch between Python, Java, C++, and more—all in one place without juggling different setups.',
    icon:lang
  },
  {
    title: 'Cloud Accessibility',
    shortDescription: 'Code anywhere, anytime, without setup.',
    longDescription: 'Our cloud platform eliminates setup or version management, ensuring seamless use across all your devices.',
    icon:cld
  },

  {
    title: 'Beginner-Friendly',
    shortDescription: 'Guided help for new coders.',
    longDescription: 'New to coding? Our simplified guidance and clear explanations will help you learn the fundamentals faster.',
    icon:frnd
  },
];

const How_It_Works = () => {
  return (
    <section id='how_works' className='py-20 flex justify-center'>
      {/* ANIMATION */}
      <AnimatedContent              
              distance={100} 
              direction="vertical"
              duration={1.0}
              ease="power2.out" 
              initialOpacity={.1}
              animateOpacity
              scale={.95}
              threshold={0.3} 
            >
        <div className='text-center max-w-7xl mx-auto px-6 text-center'>
          {/* HEADING */}
          <h2 className='text-[40px] font-bold mb-3 md:mb-8 text-cyan-500'>How It Works</h2>
          <p className='text-blue-100 mb-16'>Explore our powerful features designed to make your coding experience smoother and more efficient.</p>

          <div className='grid grid-cols-1 md:grid-cols-2  gap-20'>
            {/* GRID */}
            {points.map((feature, index) => (
              <div
                key={index}
                className='
                  group relative bg-[#1b3553] rounded-2xl  px-3 py-10  max-w-6xl 
                  flex flex-col items-center 
                  transition-all duration-300 ease-in-out transform 
                  hover:translate-y-2 hover:shadow-gray-800 hover:shadow-2xl hover:scale-110
                  border border-gray-600 text-blue-200
                '
              >
                <div className='flex flex-col items-center text-center transition-opacity p-5 duration-300 group-hover:opacity-0'>
                  <img src={feature.icon} className='h-[30px] w-[30px] mb-2' alt="" />
                  <h3 className='text-xl font-bold text-[#5dbbee] p-4 mb-2'>{feature.title}</h3>
                  <p className='text-blue-200 text-base'>
                    {feature.shortDescription}
                  </p>
                </div>

                <div 
                  className='
                    absolute inset-0 p-6 flex items-center justify-center 
                    opacity-0 transition-opacity duration-300
                    group-hover:opacity-100
                  '
                >
                  <p className=''>{feature.longDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedContent>
    </section>
  );
};

export default How_It_Works;
