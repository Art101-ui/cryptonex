'use client'

import Image from "next/image"
import Logo from '@/public/Logo.png'
import { GoHomeFill } from "react-icons/go";
import { IoLayersOutline } from "react-icons/io5";
import Input from "../input";
import DropDown from "./dropdown";
import ThemeButton from "./themebutton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

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

    return(
        <div className="flex items-center gap-8 h-full justify-between">
           <div className="flex items-center gap-2">
            <Image 
                src= {Logo}
                alt="logo"
                width={30}
                height={30}
                />
            <h1 className=" text-[21px]">CryptoNex</h1>
           </div>
           <div className="flex items-center gap-8">
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
           <div className="flex h-full gap-4">     
              <Input placeholder="Search..." />
              <DropDown/>
              <ThemeButton/>
           </div>
        </div>
    )
}