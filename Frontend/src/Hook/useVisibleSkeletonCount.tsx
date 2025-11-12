import { useEffect, useState } from "react";

export const useVisibleSkeletonCount =()=>{
    const [count,setCount]=useState<number>(5)
    useEffect(()=>{
      const updateCount=()=>{
        const screenWidth = window.innerWidth;
        const skeletonCount = Math.floor(screenWidth / 60);
        setCount(skeletonCount)
      }
      updateCount()
      window.addEventListener('resize',updateCount)
      return ()=>{
        window.removeEventListener('resize', updateCount)
      }
    })
    return count
  }