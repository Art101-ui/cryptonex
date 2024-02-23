import Image from "next/image"
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri"
import clsx from "clsx"
import { MouseEventHandler } from "react"
import { FetchedDataProps } from "@/app/lib/type"
import { getCurrencySymbol } from "@/app/lib/utilis"
import { useAppSelector } from "@/redux/store"


export default function CoinBox({coin,onSelect,selectedIds}:{coin:FetchedDataProps,onSelect:(id: string)=> void,selectedIds:string[]}){
  const currency = useAppSelector(state=>state.changeCurrencyReducer.currency)
    return(
        <div onClick={()=>onSelect(coin.id)} className={clsx(
          "flex items-center cursor-pointer w-[220px] h-[78px] rounded-md p-3",
          {'bg-[#6161D680] text-white': selectedIds.some(selectedId=>selectedId===coin.id)},
          {'bg-white ': !selectedIds.some(selectedId=>selectedId===coin.id)}
        )}>
            <Image 
              className=" mr-3"
              src= {coin.image}
              alt="exchange"
              width={30}
              height={30}
              />
            <div className=''>
              <h2 className="mb-2 text-[16px]">{coin.name}</h2>
              <p className="flex gap-2 text-[14px]">{getCurrencySymbol(currency)}{Math.abs(coin.current_price).toFixed(2)}<span className="flex items-center">
                { coin.current_price > 0
                 ? <RiArrowUpSFill className = 'text-[#01F1E3]' />
                 : <RiArrowDownSFill className= ' text-[#FE2264]'/>}
                
                {Math.abs(coin.twenty_four).toFixed(2)}%</span>
              </p>
            </div>
          </div>
    )
}