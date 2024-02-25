import Image from "next/image"
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri"
import clsx from "clsx"
import { MouseEventHandler } from "react"
import { FetchedDataProps } from "@/app/lib/type"
import { getCurrencySymbol } from "@/app/lib/utilis"
import { useAppSelector } from "@/redux/store"
import bitcoin from '@/public/bitcoin.png'


export default function CoinBox({coin,onSelect,selectedIds}:{coin:FetchedDataProps,onSelect:(id: string)=> void,selectedIds:string[]}){
  const currency = useAppSelector(state=>state.changeCurrencyReducer.currency)
    return(
        <div onClick={()=>onSelect(coin.id)} className={clsx(
          "flex items-center justify-center cursor-pointer w-[98px]  md:w-[170px] lg:w-[210px] h-[50px] md:h-[78px] rounded-md gap-3 p-2 md:p-3",
          {'bg-[#6161D680]/50 text-white': selectedIds.some(selectedId=>selectedId===coin.id)},
          {'bg-white dark:bg-[#191925] ': !selectedIds.some(selectedId=>selectedId===coin.id)}
        )}>
            <Image 
              className=" w-[25px] h-[25px] md:w-[30px] md:h-[30px] "
              src= {coin.image}
              alt="exchange"
              width={0}
              height={0}
              />
            <div className=''>
              <h2 className=" md:mb-2 text-[16px]">
                <span className="hidden md:block">{coin.name}</span>
                <span className="block md:hidden">{coin.symbol.toUpperCase()}</span>
                
              </h2>
              <p className="md:flex gap-2 text-[14px] hidden">{getCurrencySymbol(currency)}{Math.abs(coin.current_price).toFixed(2)}
              <span className={
                clsx(
                "flex items-center",
                {'dark:text-[#01F1E3]' : coin.twenty_four > 0},
                {'dark:text-[#FE2264]' : coin.twenty_four < 0},
                )}>
                { coin.twenty_four >= 0
                 ? <RiArrowUpSFill className=' text-[#01F1E3]' />
                 : <RiArrowDownSFill className='text-[#FE2264]' />
                 }           
                {Math.abs(coin.twenty_four).toFixed(2)}%</span>
              </p>
            </div>
          </div>
    )
}