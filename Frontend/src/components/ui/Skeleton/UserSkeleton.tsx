import {motion} from 'framer-motion'

export const UserSkeleton = () => {
  return (
    <div
      className="flex items-center space-x-4 animate-pulse">
      <div className="bg-accent rounded-full w-11 h-11"></div>
      <div className="flex flex-col space-y-2">
        <div  className="bg-accent rounded-md h-4 w-[250px]"></div>
        <div className="bg-accent rounded-md h-3 w-[200px]"></div>
      </div>
    </div>
  )
}
