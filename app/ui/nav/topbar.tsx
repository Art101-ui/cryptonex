import Image from "next/image"
import flashcircle from '@/public/flashcircle.png'
import exchange from '@/public/exchange.png'
import { RiArrowUpSFill } from "react-icons/ri";
import ProgressBar from "../progressbar";
import bitcoin from '@/public/bitcoin.png'
import ethereum from '@/public/ethereum.png'

export default function Topbar(){
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
            <span className="ml-2">7338</span>
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
            <span className="ml-2">622</span>
          </div>
          <div className=" text-[12px] text-white flex items-center">
            <div className="">
              <RiArrowUpSFill />
            </div>
            <span className="ml-2">1.69T</span>
          </div>
          <div className="flex items-center text-[12px] text-white">
            <span className="mr-2">$124.45B</span>
            <div className='h-1 w-[53px]  bg-gray-300'>
              <ProgressBar color="bg-white" percentage={25}/>
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
              {40}%
            <div className=' ml-2 h-1 w-[53px] bg-gray-300'>
              <ProgressBar color="bg-[#F7931A]" percentage={40}/>
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
              {21}%
            <div className=' ml-2 h-1 w-[53px] bg-gray-300'>
              <ProgressBar color="bg-[#849DFF]" percentage={21}/>
            </div>
          </div>
        </div>
    )
}