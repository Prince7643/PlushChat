import { useState } from "react"
import { Mail, UserIcon,Lock } from "lucide-react"
import { Link } from "react-router-dom"
import { assests } from "../assets/assets"
import { useUserStore } from "../store/useAuthStore"
import {motion} from 'framer-motion'

const SignupPage = () => {

  const {signup}=useUserStore();
  const [fonmData,setFormData]=useState({
    username:'',
    email:'',
    password:''
  })
  const handleSubmit=(e: { preventDefault: () => void })=>{
    e.preventDefault()
    signup(fonmData)

  }
  return (
   <div>
    <div className="min-h-screen bg-[#0e0e10] text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-700/10 to-slate-600/20 blur-3xl opacity-30" />
        <div className="w-full flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold  mb-2 bg-gradient-to-r from-yellow-700 to-yellow-400 text-transparent bg-clip-text">Create Account</h1>
                <p className="text-slate-400">Sign up for a new Account</p>
              </div>
              <form action="" className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 text-yellow-300 top-1/2 -translate-y-1/2 size-5"></UserIcon>
                    <input value={fonmData.username} onChange={(e)=>setFormData({...fonmData,username:e.target.value})} type="text" placeholder="Jhon Doe" className=" py-2 pl-10 pr-4 bg-slate-800 text-slate-200 border border-slate-600 rounded-lg w-full focus:ring-cyan-500 focus:border-transparent" />
                  </div>
                </div>
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
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit} 
                    type="submit" 
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-md transition duration-300 hover:border-yellow-300">Sign Up</motion.button>
                </div>
              </form>
               <div className="relative text-center mt-6 flex justify-center gap-2">
                  Already have an account?{" "}
                  <Link to="/login">
                    <motion.div
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}
                    className="text-yellow-400 hover:underline">
                      Login
                    </motion.div>
                  </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-gray-700/1 to-transparent">
            <div>
              <img src={assests.signup} alt="" className="w-fit h-auto object-contain" />
              <div className="absolute left-250 text-xl text-cyan-300 font-bold">
                <div >Start Your Journey Today</div>
              </div>
            </div>
          </div>
        </div>
    </div>
   </div>
  )
}

export default SignupPage