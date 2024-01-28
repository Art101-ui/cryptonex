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
import { StatusProps } from "@/app/lib/type";
import axios from "axios";
import { useState, useEffect } from "react";

const links = [
    { name: 'Home', href: '/', icon: GoHomeFill },
    {
      name: 'Portfolio',
      href: '/portfolio',
      icon: IoLayersOutline,
    },
  ];

  type CoinListProp ={
    id: string;
    name:string,
    image:string,  
}

export default function BottomBar({}){
    const pathname = usePathname()

    const [coinstatus,setcoinStatus] = useState<StatusProps>('idle')
    const [coins, setCoins] = useState<CoinListProp[]>([])
    // useEffect(() => {
    //     const abortController = new AbortController()
    //     const signal = abortController.signal
    //     async function getMainCoin() {
    //       setcoinStatus('loading')
         
    //       try {
    //         const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=60&page=1&sparkline=false&locale=en?api_key=CG-8CfAjVRc52vDuq5qtrTNDD1p',{signal})
    //         const formattedData:CoinListProp[]
    //          = response.data.map((item:any)=>{
    //           return {
    //             id:item.id,
    //             name:item.name,
    //             image:item.image,
    //           }
    //         })
    //         setCoins(formattedData)
    //         setcoinStatus('success')
    //       } catch (error) {
    //         console.log(error)
    //         setcoinStatus('error')
    //       }
          
    //     }
    //     getMainCoin()
      
    //     return ()=>abortController.abort()
    //   }, [])

      const isLoading = coinstatus === 'loading'
    
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
                                
                                {'text-[#353570] font-medium' : pathname=== link.href },
                                { ' font-light' : pathname !== link.href  }        
                                
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
              <Input placeholder="Search..." isLoading={isLoading} coins={coins} />
              <DropDown/>
              <ThemeButton/>
           </div>
        </div>
    )
}