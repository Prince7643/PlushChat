
export const UserSkeleton = () => {
  return (
    <div
      className="flex items-center space-x-4 animate-pulse p-3">
      <div className="bg-gray-300 rounded-full w-16 h-16"></div>
      <div className="flex flex-col space-y-2">
        <div  className="bg-gray-200 rounded-md h-4 w-[300px]"></div>
        <div className="bg-gray-200 rounded-md h-3 w-[200px]"></div>
      </div>
    </div>
  )
}
