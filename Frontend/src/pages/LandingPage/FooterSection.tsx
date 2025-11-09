// src/pages/AboutSection.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function FooterSection() {
  const navigate =useNavigate()
  return (
    <>
      <section id="about" className="py-15 bg-gradient-to-b from-[#0e0e10] to-[#1a1a1d] items-center">
        <div className="max-w-[110rem] mx-auto px-6 ">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Ready to Transform Your Communication?           
            </h2>
            <p className="text-xl font-paragraph text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Join thousands of users who have already discovered the future of messaging. Get started today and experience the difference.
            </p>
            <div className='flex justify-center items-center mt-5 '>                      
            <motion.div
              className="flex flex-col sm:flex-row gap-10 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.button
                onClick={()=>navigate('/signup')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }} 
                className="rounded-2xl px-10 py-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-semibold group text-2xl"
              >
                Get Started
              </motion.button>
              <motion.button
                onClick={()=>navigate('/login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{scale:0.95}} 
                className="hover:text-yellow-400 hover:underline text-2xl"
              >
                Login
              </motion.button>
            </motion.div></div>
          </motion.div>
        <div className='border-b-2 border-black'></div>
      </div>
      <div className='flex justify-center mt-10'>The future of digital communication, designed for modern teams and individuals.</div>
      </section>
    </>
  );
}
