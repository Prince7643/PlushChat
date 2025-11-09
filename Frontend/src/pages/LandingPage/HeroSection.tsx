// src/pages/WelcomePage.tsx
import { motion } from "framer-motion";
import { ArrowRight, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate =useNavigate()
  const handleScrool=(id:string)=>{
    const el=document.getElementById(id);
    if(el){
      el.scrollIntoView({behavior:'smooth'})
    }
  }
  return (
    <>
      <div id="hero" className='mt-10 ml-9 mr-9 flex justify-between'>
        <div className='text-5xl font-bold'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='flex space-x-1'>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 5, repeat: Infinity,ease:"linear"}}
              >
                <Zap size={50} className='text-yellow-400'/>
              </motion.div>
              <span>PlushChat</span>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{duration:0.6}}
          className='flex justify-center items-center text-xl gap-4'>
            <motion.div
              onClick={()=>handleScrool('hero')} 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className='cursor-pointer hover:underline hover:text-yellow-400'
            >
              Home
            </motion.div>
            <motion.div
            onClick={()=>handleScrool('feature')} 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className='cursor-pointer hover:underline hover:text-yellow-400'
            >
              Feature
            </motion.div>
            <motion.div
              onClick={()=>navigate('/login')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className='cursor-pointer hover:underline hover:text-yellow-400'
            >
              Login
            </motion.div>
            <motion.div
              onClick={()=>navigate('/signup')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className='cursor-pointer rounded-full text-black px-3 py-1 bg-yellow-500 hover:bg-yellow-400 font-semibold'
            >
              Get Started
            </motion.div>
        </motion.div>
      </div>
        {/**Hero*/}
        <section className='mt-20 ml-9 mr-9  flex-col max-w-[120rem] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center '>
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl"
              animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-40 left-20 w-20 h-20 bg-yellow-400/20 rounded-full"
            animate={{
              x: [0, 30, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div className='absolute top-60 right-15 w-74 h-64 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl opacity-50 blur-2xl'>
          <motion.div
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -10, 10, -10, 10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          </motion.div>

          <motion.div
            className="text-center lg:text-left z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-yellow-400/10 rounded-full border border-yellow-400/20 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Star className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-yellow-400 text-sm font-medium">Next-Gen Technology</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Welcome to
              <motion.span 
                className="bg-gradient-to-r bg-clip-text text-transparent from-yellow-700 to-yellow-400"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                PluseChat
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl font-paragraph text-gray-300 mb-8 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Your next-generation chat experience — smart, fast, and beautifully designed.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.button
                onClick={()=>navigate('/signup')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }} 
                className="rounded-2xl px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-semibold group"
              >
                Get Started
              </motion.button>
              <motion.button
                onClick={()=>navigate('/login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{scale:0.95}} 
                className="hover:text-yellow-400 hover:underline"
              >
                Login
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div
            className='flex justify-center lg:justify-end'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay:0.4 }}
          >
          <motion.div
                animate={{
                  opacity: 2,
                  scale: 1,
                  y: [0, -10, 10, -10, 10, 0],  // 👈 up-down vibration
                }}
              transition={{ duration:10,repeat:Infinity,repeatType:"loop" }}
            
            className='bg-gradient-to-b flex items-center justify-center bg-[#1e1e22] h-90 w-80 rounded-4xl'>
              <div className='bg-[#0e0e10] rounded-2xl w-70 h-80'>
                <div className='mt-2'>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className='flex space-x-1 justify-between p-4'>
                    <div className='flex'>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity,ease:"linear"}}
                    ><Zap size={25} className='text-yellow-400'/></motion.div>
                    <span className='font-semibold text-2xl'>PlushChat</span>
                    </div>
                    <span className='bg-[#1b243a] rounded-full w-7 h-7'></span>
                  </motion.div>
                  <div className=''>
                    <div className=' flex flex-col gap-3'>
                      <div className='flex justify-end mr-3'>
                      <div className='bg-[#122040] p-2'>
                        Hey! How's your day going?
                      </div>
                    </div>
                    <div className='flex justify-start ml-3'>
                      <div className='bg-[#0235b8] p-2'>
                        Great! Just finished the project.
                        <br />Thanks for asking! 🎉</div>
                    </div>
                    <div className='flex justify-end mr-3'>
                      <div className='bg-[#122040] p-2'>
                        Awesome! Let's celebrate later
                      </div>
                    </div>
                    </div>
                    <div className='flex justify-center mt-8 gap-2 items-center'>
                      <div className='bg-[#1b243a] rounded-2xl px-9 py-2 text-start'>type a message...</div>
                      <div className='bg-[#0235b8] rounded-full w-7 h-7 p-1.5'><ArrowRight size={15}/></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>
    </>
  );
}
