
import Image from "next/image"
import flashcircle from '@/public/flashcircle.png'
import exchange from '@/public/exchange.png'
import { RiArrowUpSFill } from "react-icons/ri";
import ProgressBar from "../progressbar";
import bitcoin from '@/public/bitcoin.png'
import ethereum from '@/public/ethereum.png'
import { getGlobalData } from "@/app/lib/data";
import { convertToBillion, convertToTrillion } from "@/app/lib/utilis";


export default async function TopBar(){
  const {
    coins,
    markets,
    market_cap,
    total_volume,
    btc_percentage,
    eth_percentage,
    t4h_percentage
  } = await getGlobalData()
  
  

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
            <span className="ml-2">{coins}</span>
          </div>
          <div className="text-[12px] text-white flex items-center">
            <Image 
            className=" mr-2"
            src= {exchange}
            alt="exchange"
            width={16}
            height={16}
            />
            Exchange
            <span className="ml-2">{markets}</span>
          </div>
          <div className=" text-[12px] text-white flex items-center">
              <RiArrowUpSFill className = 'text-[#01F1E3]' />
            <span className="ml-2">{convertToBillion(total_volume)}B</span>
          </div>
          <div className="flex items-center text-[12px] text-white">
            <span className="mr-2">${convertToTrillion(market_cap)}T</span>
            <div className='h-1 rounded-sm w-[53px]  bg-gray-300'>
              <ProgressBar color="bg-white" percentage={t4h_percentage}/>
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
              {Math.round(btc_percentage)}%
            <div className=' rounded-sm ml-2 h-1 w-[53px] bg-gray-300'>
              <ProgressBar color="bg-[#F7931A]" percentage={Math.round(btc_percentage)}/>
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
              {Math.round(eth_percentage)}%
            <div className=' rounded-sm ml-2 h-1 w-[53px] bg-gray-300'>
              <ProgressBar color="bg-[#849DFF]" percentage={Math.round(eth_percentage)}/>
            </div>
          </div>
        </div>
    )
}