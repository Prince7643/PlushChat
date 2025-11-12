import { useEffect, useState } from "react";

export const useVisibleSkeletonCount =(num:number)=>{
    const [count,setCount]=useState<number>(num)
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