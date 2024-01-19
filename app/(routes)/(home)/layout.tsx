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
        <div className=" px-[72px] ">
            <div className=" bg-white flex w-[450px] h-[45px] rounded-md mb-6">
                {links.map(link=>{
                  return(
                    <Link 
                     key={link.name}
                     href={link.href}
                     className={clsx("flex justify-center items-center w-1/2 h-full font-bold py-3 px-4 rounded-md",
                        {'bg-[#6161D6] text-white' : pathname === link.href},
                      )}>
                        {link.name}
                      
                    </Link>
                  )
                })}
            </div>
            <div>
              {children}
            </div>
        </div>
    )
}


// function Button({children, page}:LinkProps){
//    return(
//      <div className={clsx("flex justify-center items-center hover:bg-blue-700 w-1/2 h-full font-bold py-3 px-4 rounded-md",
//        {'bg-[#6161D6] text-white' : page ==='coin'},
//        {' text-[#6161D6]' : page ==='converter'}
//      )}>
//         {children}
//      </div>
//    )
// }