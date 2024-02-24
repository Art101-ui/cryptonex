'use client'

import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() =>  setMounted(true), [])

  if (!mounted) return (
    <Image
      src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
      width={36}
      height={36}
      sizes="36x36"
      alt="Loading Light/Dark Toggle"
      priority={false}
      title="Loading Light/Dark Toggle"
    />
  )

  const theme = ()=>{
      if (resolvedTheme === 'dark') {
        return <FiSun className = 'w-[22px] h-[22px]' onClick={() => setTheme('light')} />
      }else if (resolvedTheme === 'light') {
        return <FiMoon className = 'w-[22px] h-[22px]' onClick={() => setTheme('dark')} />
      }    
  }


  return (
    <div className="p-3 bg-[#CCCCFA66] dark:bg-[#191925] rounded cursor-pointer items-center flex">
        {
          theme()
        }
    </div>
  )

}




















// 'use client'
// import { useState } from "react";
// import { useTheme } from "next-themes";
// import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

// export default function ThemeButton(){
   
//     const [mounted, setMounted] = useState(false);
//     const {setTheme, resolvedTheme} = useTheme()

//     return(
//         <div onClick={()=>setTheme(prev=>!prev)} className="p-3 bg-[#CCCCFA66] rounded cursor-pointer items-center flex">
//            {theme ? <IoMoonOutline className = 'w-[24px] h-[24px]' /> : <IoSunnyOutline className = 'w-[24px] h-[24px]' /> }
//         </div>
//     )
// }