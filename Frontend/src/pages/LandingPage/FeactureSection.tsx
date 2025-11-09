// src/pages/FeaturesSection.tsx
import { motion } from "framer-motion";
import { CheckCircle, Globe, Shield, Star, Zap } from "lucide-react";

export default function FeaturesSection() {
  return (
    <>
      <section className="py-30 bg-gradient-to-b from-[#0e0e10] to-[#1a1a1d]">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-yellow-400/10 rounded-full border border-yellow-400/20 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Zap className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-yellow-400 text-sm font-medium">Why Choose Us</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Experience Chat Without Limits            
            </h2>
            <p className="text-xl font-paragraph text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect instantly, share freely, and stay closer to the people who matter.
              Experience chat without limits — fast, private, and beautifully simple.
            </p>
          </motion.div>
        </div>
      </section>
      {/**About*/}
      <section id="feature" className="py-20 bg-[#0e0e10]">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-yellow-400/10 rounded-full border border-yellow-400/20 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Star className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-yellow-400 text-sm font-medium">Advanced Features</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Powerful App for Modern Communication
            </h2>
            <p className="text-xl font-paragraph text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience seamless communication with our next-generation chat platform. Built for modern teams and individuals who value privacy, speed, and simplicity.
            </p>
          </motion.div>

          {/* Feature 1 - AI-Powered Analytics */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-white">
                  Privacy First
                </h3>
              </div>
              
              <p className="text-lg font-paragraph text-gray-300 mb-6 leading-relaxed">
                End-to-end encryption ensures your conversations remain private and secure.
              </p>
              
              <div className="space-y-4">
                {[
                  "Only You and Your Contacts Can Read Messages",
                  "Advanced Security by Design",
                  "Automated report generation",
                  "Peace of Mind in Every Conversation"
                ].map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <span className="font-paragraph text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <motion.div
                  className="w-80 h-44 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700/50 shadow-2xl"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Mock Analytics Dashboard */}
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold">Security Status</h4>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Encryption Strength</span>
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-gray-700 rounded-full mr-2">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "85%" }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <span className="text-yellow-400 text-sm">85%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Secure Connections</span>
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-gray-700 rounded-full mr-2">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: 0.7 }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <span className="text-green-400 text-sm">HTTPS</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Account Leaks</span>
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-gray-700 rounded-full mr-2">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: 0.9 }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <span className="text-blue-400 text-sm">0 Reported</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Feature 2 - Global Infrastructure */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="order-2 lg:order-1 flex justify-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <motion.div
                  className="w-80 h-64 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700/50 shadow-2xl overflow-hidden"
                  animate={{
                    rotateY: [0, 2, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Global Network Visualization */}
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold">Global Networking</h4>
                    <Globe className="w-5 h-5 text-yellow-400" />
                  </div>
                  
                  <div className="relative h-32 bg-gray-800/50 rounded-lg overflow-hidden">
                    {/* Animated Network Nodes */}
                    {[
                      { x: "20%", y: "30%", delay: 0 },
                      { x: "60%", y: "20%", delay: 0.5 },
                      { x: "80%", y: "60%", delay: 1 },
                      { x: "30%", y: "70%", delay: 1.5 },
                      { x: "50%", y: "50%", delay: 2 },
                    ].map((node, index) => (
                      <motion.div
                        key={index}
                        className="absolute w-3 h-3 bg-yellow-400 rounded-full"
                        style={{ left: node.x, top: node.y }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: node.delay,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                    
                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      <motion.path
                        d="M 60 40 Q 120 30 240 80"
                        stroke="rgba(250, 204, 21, 0.3)"
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="5,5"
                        animate={{
                          strokeDashoffset: [0, -10],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      <motion.path
                        d="M 80 90 Q 160 60 200 25"
                        stroke="rgba(250, 204, 21, 0.3)"
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="3,7"
                        animate={{
                          strokeDashoffset: [0, -10],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-white">
                  Global Networking
                </h3>
              </div>
              
              <p className="text-lg font-paragraph text-gray-300 mb-6 leading-relaxed">
                Connect instantly with anyone, anywhere — no boundaries, no lag, just real-time interaction.
              </p>
              
              <div className="space-y-4">
                {[
                  "Seamless Worldwide Communication",
                  "Optimized for Global Performance",
                  "Always Online, Always Reliable"
                ].map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <span className="font-paragraph text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}