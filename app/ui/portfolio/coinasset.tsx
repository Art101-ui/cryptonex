import Image from "next/image"
import { MdDelete } from "react-icons/md";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri"
import ProgressBar from "@/app/ui/progressbar"
import { SearchCoinProps } from "@/app/lib/type"
import clsx from "clsx"
import { getCurrencySymbol } from "@/app/lib/utilis";
import { useAppSelector } from "@/redux/store";

interface CoinAssetProps {
    asset: SearchCoinProps;
    onDeleteAsset: (id: string)=> void
  }

  
export default function CoinAsset({asset,onDeleteAsset}:CoinAssetProps){
    const mc_tv = parseFloat(((asset.market_cap/asset.volume)).toFixed(2))
    const cs_ts = parseFloat(((asset.circulating_supply/asset.total_supply)).toFixed(2))
    
    const currency = useAppSelector(state=>state.changeCurrencyReducer.currency)
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
            <div className=" mb-2">
                <span className=" mr-2 text-[28px]">{getCurrencySymbol(currency)}{asset.current_price}</span> 
            </div>
            <p className=" text-[16px]"><span className="  font-bold">{asset.purchased}</span> Purchased in {asset.date}</p>
        </div>
        <div className=" flex flex-col w-2/3   px-4 py-4 bg-white gap-2 rounded-r-lg">
            <div className="  w-full h-7  flex justify-end">
               <MdDelete onClick={()=>{onDeleteAsset(asset.id)}} size={30} className=' hover:bg-red-300 rounded-full  h-full text-red-600 cursor-pointer' />
            </div>
            <div className=" flex w-full">
                <div className=" w-1/2 flex flex-col gap-2">
                    <div className=" rounded-lg  px-[10px] py-2">
                        <h1 className=" text-[20px]">{getCurrencySymbol(currency)}{(asset.current_price).toFixed(2)}</h1> 
                        <p className=" text-[14px]">Current price</p>
                    </div>
                    <div className=" rounded-lg  px-[10px] py-2">
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
                    <div className=" rounded-lg  px-[10px] py-2">
                    <span className={clsx(
                            "flex items-center text-[20px]",
                            {'text-[#00B8C6]': asset.twenty_four > 0},
                            {'text-[#fe2264]': asset.twenty_four < 0},
                            )}>
                            {
                            asset.twenty_four > 0 ?<RiArrowUpSFill/> :<RiArrowDownSFill/> 
                            }    
                            
                            {(Math.abs(asset.twenty_four).toFixed(2))}%</span> 
                    <p className=" text-[14px]">24h%</p>
                    </div>
                    <div className=" rounded-lg  px-[10px] py-2">
                        <span className="flex items-center text-[20px] text-[#00B8C6]"
                            ><RiArrowUpSFill/> {cs_ts * 100}%</span> 
                        <p className=" text-[14px]">Circ. supply vs total supply</p>
                    </div>         
                </div>

            </div>
        </div>
    </div>
    )
}