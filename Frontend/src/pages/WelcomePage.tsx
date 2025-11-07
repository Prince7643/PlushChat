// src/pages/WelcomePage.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#0e0e10] text-white flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-6 md:px-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-700/10 to-slate-600/20 blur-3xl opacity-30" />

      {/* Main content */}
      <motion.div
        className="z-10 text-center w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold">💬</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 tracking-tight">
          Welcome to <span className="text-indigo-400">PulseChat</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 mb-8 sm:mb-10 text-base sm:text-lg md:text-xl leading-relaxed px-2 sm:px-0">
          Your next-generation chat experience — smart, fast, and beautifully designed.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center">
          <Link to="/signup" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 w-full sm:w-auto rounded-xl shadow-md transition"
            >
              Get Started
            </motion.button>
          </Link>

          <Link to="/login" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-600 hover:border-indigo-500 hover:text-indigo-400 px-8 py-3 w-full sm:w-auto rounded-xl font-semibold transition"
            >
              Login
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-4 sm:bottom-6 text-xs sm:text-sm text-gray-600 text-center px-4">
        © {new Date().getFullYear()} PulseChat. All rights reserved.
      </footer>
    </div>
  );
}
