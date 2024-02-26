'use client'

import Image from "next/image"
import Logo from '@/public/Logo.png'
import { GoHomeFill } from "react-icons/go";
import { IoLayersOutline } from "react-icons/io5";
import { FaBarsStaggered } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import Input from "../input";
import DropDown from "./dropdown";
import ThemeButton from "./themebutton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";

const links = [
    { name: 'Home', href: '/', icon: GoHomeFill },
    {
      name: 'Portfolio',
      href: '/portfolio',
      icon: IoLayersOutline,
    },
  ];

export default function BottomBar(){
    const pathname = usePathname()
    const [menu, setMenu] = useState(false)
    const [size,setSize] = useState(0)
    if(typeof window === 'undefined'){
        global?.window?.addEventListener('resize',()=>{
            setSize(window.screen.width)
        })      
    }
    
    return(
       
            <div className="flex items-center gap-8 h-full justify-between">
                <div className="flex items-center gap-2">
                    <Image 
                        src= {Logo}
                        alt="logo"
                        width={30}
                        height={30}
                        />
                    <h1 className=" text-[18px] sm:text-[21px]">CryptoNex</h1>
                </div>
                <div className="sm:flex hidden items-center gap-8">
                    {
                        links.map(link=>{
                            const LinkIcon = link.icon
                            return(
                                <Link 
                                key={link.name}
                                href={link.href}
                                className={
                                    clsx(
                                        "flex items-center gap-2",
                                        {'text-[#353570] dark:text-[#FFFFFF] font-medium' : pathname=== link.href },
                                        { ' font-light dark:text-[#FFFFFF]/50' : pathname !== link.href  }        
                                        
                                    )
                                }>
                                    <LinkIcon/>
                                    <h3>{link.name}</h3>
                                </Link> 
                            )
                        })
                    }
                </div>
                <div className="sm:flex hidden h-full gap-4">     
                    <Input placeholder="Search..." />
                    <DropDown/>
                    <ThemeButton/>
                </div>
                <div className="relative sm:hidden block cursor-pointer" onClick={()=>setMenu(prev=>!prev)}>
                    {menu ? <GrClose/> : <FaBarsStaggered/>}
                    {
                        menu && size < 640 ?
                        <div className=" z-50 absolute right-0 top-10 shadow-md bg-white dark:bg-[#6161D6] rounded p-3 flex flex-col items-center w-[200px]">
                            <div >
                                        {
                                    
                                            links.map(link=>{
                                                const LinkIcon = link.icon
                                                return(
                                                    <Link 
                                                    key={link.name}
                                                    href={link.href}
                                                    className={
                                                        clsx(
                                                            "flex items-center mb-4 justify-center gap-2",
                                                            {'sm:text-[#353570] dark:text-[#FFFFFF] font-medium' : pathname=== link.href },
                                                            { ' font-light  sm:dark:text-[#FFFFFF]/50' : pathname !== link.href  }                    
                                                        )
                                                    }>
                                                        <LinkIcon/>
                                                        <h3>{link.name}</h3>
                                                    </Link> 
                                                )
                                            })
                                        }
                                        <div className="flex justify-center mb-4">
                                            <ThemeButton/>
                                        </div>
                                            <DropDown/>        
                                </div>
                            </div>
                         : null
                    }
                </div>
            </div>
    )
}


