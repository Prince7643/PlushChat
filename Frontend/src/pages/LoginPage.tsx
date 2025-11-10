import { useState } from "react"
import { Mail,Lock } from "lucide-react"
import { Link } from "react-router-dom"
import { assests } from "../assets/assets"
import { useUserStore } from "../store/useAuthStore"
import { motion } from 'framer-motion'
const LoginPage = () => {
  const {login}=useUserStore()
  const [fonmData,setFormData]=useState({
    username:'',
    email:'',
    password:''
  })
  const handleSubmit=(e: { preventDefault: () => void })=>{
    e.preventDefault()
    login(fonmData)
  }
  return (
   <div>
    <div className="min-h-screen bg-[#0e0e10] text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-700/10 to-slate-600/20 blur-3xl opacity-30" />
        <div className="w-full flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-700 to-yellow-400 text-transparent bg-clip-text mb-2">Welcome Back</h1>
                <p className="text-slate-400">Login to access your account</p>
              </div>
              <form action="" className="space-y-6">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 text-yellow-300 top-1/2 -translate-y-1/2 size-5 "></Mail>
                    <input value={fonmData.email} onChange={(e)=>setFormData({...fonmData,email:e.target.value})} placeholder="example@gamil.com" type="email"className="py-2 pl-10 pr-4 bg-slate-800 text-slate-200 border border-slate-600 rounded-lg w-full focus:ring-cyan-500 focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-300">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 text-yellow-300 top-1/2 -translate-y-1/2 size-5"></Lock>
                    <input value={fonmData.password} onChange={(e)=>setFormData({...fonmData,password:e.target.value})} placeholder="Enter your password" type="password"className="py-2 pl-10 pr-4 bg-slate-800 text-slate-200 border border-slate-600 rounded-lg w-full  focus:ring-cyan-500 focus:border-transparent" />
                  </div>
                </div>
                <div className="relative">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{scale:0.90}}
                    onClick={handleSubmit} 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-yellow-700 to-yellow-400 text-white font-semibold py-3 rounded-md transition duration-300">Sign Up</motion.button>
                </div>
              </form>
               <div className="relative text-center mt-6 flex justify-center gap-2">
                  Don't have an account?{" "}
                  <Link to="/signup">
                    <motion.div
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}
                    className="text-yellow-400 hover:underline">Signup</motion.div>
                  </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-gray-700/1 to-transparent">
            <div>
              <img src={assests.login} className='' />
              <div className="absolute left-250 text-xl text-cyan-300 font-bold">
                <div >Connect Anytime, Anywhere</div>
              </div>
            </div>
          </div>
        </div>
    </div>
   </div>
  )
}

export default LoginPage