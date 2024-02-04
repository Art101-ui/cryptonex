import Image from "next/image"
import bitcoin from '@/public/bitcoin.png'
import { RiArrowUpSFill } from "react-icons/ri"
import ProgressBar from "@/app/ui/progressbar"
import { AssetsProp } from "@/app/lib/type"

interface CoinAssetProps {
    asset: AssetsProp;
  }

export default function CoinAsset({asset}:CoinAssetProps){
    const mc_tv = parseFloat(((asset.market_cap/asset.total_volume)).toFixed(2))
    
    return(
        <div className="flex w-full mb-5">
        <div className="bg-[#cecef1] rounded-l-lg w-1/3 p-4">
            <div className='flex items-center gap-1 mb-5'>
                <Image 
                className=" mr-1"
                src= {asset.image}
                alt="exchange"
                width={32}
                height={32}
                />
                <p className=' text-[24px]'>{asset.name}({asset.symbol.toUpperCase()})</p>
            </div>
            <h3 className=" text-[16px] mb-1">Total Value</h3>
            <div className=" flex">
                <span className=" mr-2 text-[28px]">${(asset.price).toFixed(2)}USD</span> 
                <span className="flex items-center text-[16px] text-[#00B8C6]"><RiArrowUpSFill/> 97.8%</span>
            </div>
            <p className=" text-[14px]">{asset.purchased} Purchased {asset.date}</p>
        </div>
        <div className=" flex w-2/3 px-4 py-6 bg-white gap-2 rounded-r-lg">
            <div className=" w-1/2 flex flex-col gap-2">
                <div className=" rounded-lg  px-[10px] py-3">
                <h1 className=" text-[20px]">${(asset.price).toFixed(2)}</h1> 
                <p className=" text-[14px]">Current price</p>
                </div>
                <div className=" rounded-lg  px-[10px] py-3">
                    <div className="flex items-center gap-2 text-[20px] text-[#627EEA]">
                        {mc_tv}%
                        <div className='h-[6px] rounded-sm w-full  bg-[#C0CBF7]'>
                            <ProgressBar percentage={mc_tv} color=" bg-[#7691fa]"/>
                        </div>
                    </div>
                    <p className="  text-[14px]">Market cap vs volume</p>
                </div>
            </div>
            <div className="w-1/2 flex flex-col gap-2">
                <div className=" rounded-lg  px-[10px] py-3">
                <span className="flex items-center text-[20px] text-[#00B8C6]"><RiArrowUpSFill/> 6.76%</span> 
                <p className=" text-[14px]">{asset.twenty_four}h%</p>
                </div>
                <div className=" rounded-lg  px-[10px] py-3">
                    <span className="flex items-center text-[20px] text-[#00B8C6]"><RiArrowUpSFill/> {(asset.circ_supply/asset.max_supply) * 100}%</span> 
                    <p className=" text-[14px]">Circ. supply vs max supply</p>
                </div>         
            </div>
        </div>
    </div>
    )
}