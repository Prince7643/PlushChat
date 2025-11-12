import { Zap } from 'lucide-react'

export const PageLoadingSkeleton = () => {
  return (
    <div className="flex items-center justify-center h-screen  bg-gradient-to-b from-[#0e0e10] to-[#1a1a1d] ">
        <div className="text-white">
            <Zap size={100} className="animate-pulse text-yellow-400"/>
        </div>
    </div>
  )
}
