"use client"
import Image from "next/image"
import flashcircle from '@/public/flashcircle.png'
import exchange from '@/public/exchange.png'
import { RiArrowUpSFill } from "react-icons/ri";

import ProgressBar from "../progressbar";
import bitcoin from '@/public/bitcoin.png'
import ethereum from '@/public/ethereum.png'
import { getGlobalData } from "@/app/lib/data";
import { convertToBillion, convertToTrillion } from "@/app/lib/utilis";
import { useEffect, useState } from "react";
import axios from "axios";
import { Data } from "@/app/lib/type";


export default function TopBar(){


  const [data, setData] = useState<Data | null>(null)

  useEffect(() => {
    const abortController = new AbortController();
    const signal  = abortController.signal
    async function getGlobalData() {
      try {     
        const response = await axios.get('https://api.coingecko.com/api/v3/global',{signal});
        const data: Data = {
          coins: response.data.data.active_cryptocurrencies,
          markets: response.data.data.markets,
          market_cap: response.data.data.total_market_cap.usd,
          total_volume: response.data.data.total_volume.usd,
          btc_percentage: response.data.data.market_cap_percentage.btc,
          eth_percentage: response.data.data.market_cap_percentage.eth,
          t4h_percentage: response.data.data.market_cap_change_percentage_24h_usd
        };   
        setData(data);
         
      } catch (error) {
          console.log(error);
      }
    }

    getGlobalData()
  
    return () => abortController.abort()
  }, [])
  
  
  

    return(
        <div className="flex items-center gap-8 p-3 ">
          <div className="text-[12px] text-white flex items-center">
            <Image 
            className=" mr-2"
            src= {flashcircle}
            alt="flash_circle"
            width={16}
            height={16}
            />
            Coins
            <span className="ml-2">{data?.coins || 0}</span>
          </div>
          <div className=" sm:flex hidden text-[12px] text-white  items-center">
            <Image 
            className=" mr-2"
            src= {exchange}
            alt="exchange"
            width={16}
            height={16}
            />
            Exchange
            <span className="ml-2">{data?.markets || 0}</span>
          </div>
          <div className=" md:flex hidden text-[12px] text-white  items-center">
              <RiArrowUpSFill className = 'text-[#01F1E3]' />
            <span className="ml-2">{convertToBillion(data?.total_volume || 0)}B</span>
          </div>
          <div className=" md:flex hidden items-center text-[12px] text-white">
            <span className="mr-2">${convertToTrillion(data?.market_cap || 0)}T</span>
            <div className='h-1 rounded-sm w-[53px]  bg-gray-300'>
              <ProgressBar color="bg-white" percentage={data?.t4h_percentage || 0}/>
           </div>
          </div>
          <div className="flex items-center text-[12px] text-white">
            <Image 
              className=" mr-2"
              src= {bitcoin}
              alt="exchange"
              width={16}
              height={16}
              />
              {Math.round(data?.btc_percentage || 0)}%
            <div className=' rounded-sm ml-2 h-1 w-[53px] bg-gray-300'>
              <ProgressBar color="bg-[#F7931A]" percentage={Math.round(data?.btc_percentage || 0)}/>
            </div>
          </div>
          <div className="flex items-center text-[12px] text-white">
            <Image 
              className=" mr-2"
              src= {ethereum}
              alt="exchange"
              width={16}
              height={16}
              />
              {Math.round(data?.eth_percentage || 0)}%
            <div className=' rounded-sm ml-2 h-1 w-[53px] bg-gray-300'>
              <ProgressBar color="bg-[#849DFF]" percentage={Math.round(data?.eth_percentage || 0)}/>
            </div>
          </div>
        </div>
    )
}