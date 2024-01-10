'use client'
import { useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export default function ThemeButton(){
    const [theme, setTheme] = useState(false);

    return(
        <div onClick={()=>setTheme(prev=>!prev)} className="p-3 bg-[#CCCCFA66] rounded items-center flex">
           {theme ? <IoMoonOutline className = 'w-[24px] h-[24px]' /> : <IoSunnyOutline className = 'w-[24px] h-[24px]' /> }
        </div>
    )
}