'use client'

import clsx from "clsx"
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function Layout({children}:{children:React.ReactNode}){
   
  const links = [
    { name: 'Coin', href: '/' },
    {
      name: 'Converter',
      href: '/converter',
      
    },
  ];
    const pathname =  usePathname()
    return(
        <div className=" px-3 md:px-[72px] pb-[40px]  ">
            {/* <div className=" bg-white dark:bg-[#232336] flex w-[450px] h-[45px] rounded-md mb-6">
                {links.map(link=>{
                  return(
                    <Link 
                     key={link.name}
                     href={link.href}
                     className={clsx("flex justify-center items-center w-1/2 h-full font-bold py-3 px-4 rounded-md",
                        {'bg-[#6161D6]/50 text-white' : pathname === link.href},
                        {' font-light dark:text-[#D1D1D1]' : pathname !== link.href},
                      )}>
                        {link.name}
                      
                    </Link>
                  )
                })}
            </div> */}
            <div>
              {children}
            </div>
        </div>
    )
}

