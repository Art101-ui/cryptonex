import Image from "next/image"
import bitcoin from '@/public/bitcoin.png'
import { RiArrowUpSFill } from "react-icons/ri"
import clsx from "clsx"
import { MouseEventHandler } from "react"

type CoinProps={
  id:string,
  coin:string
}
export default function CoinBox({coin,onSelect,selectedIds}:{coin:CoinProps,onSelect:(id: string)=> void,selectedIds:string[]}){
    return(
        <div onClick={()=>onSelect(coin.id)} className={clsx(
          "flex items-center cursor-pointer w-[220px] h-[78px] rounded-md p-3",
          {'bg-[#6161D680] text-white': selectedIds.some(selectedId=>selectedId===coin.id)},
          {'bg-white ': !selectedIds.some(selectedId=>selectedId===coin.id)}
        )}>
            <Image 
              className=" mr-3"
              src= {bitcoin}
              alt="exchange"
              width={20}
              height={20}
              />
            <div className=''>
              <h2 className="mb-2 text-[14px]">{coin.coin}</h2>
              <p className="flex gap-2 text-[12px]">27,445.55 USD <span className="flex items-center"><RiArrowUpSFill className = 'text-[#01F1E3]' />2.35%</span></p>
            </div>
          </div>
    )
}