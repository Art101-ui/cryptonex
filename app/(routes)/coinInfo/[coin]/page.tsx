'use client'
import Image from "next/image"
import bitcoin from '@/public/bitcoin.png'
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { CategoryScale, ScriptableContext } from 'chart.js';
import Chart from "chart.js/auto";
import { reduceData, getDayNumber, changeDate, convertToTrillion, convertToBillion, convertToMillion, getCurrencySymbol, reformDataLength } from "@/app/lib/utilis";
import PriceChart from "@/app/ui/home/pricechart";
import axios from "axios";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LineChart from "@/app/ui/home/linechart";
import clsx from "clsx";
import { useAppSelector } from "@/redux/store";
import DefaultSpinner from "@/app/ui/loadingSpinner";


Chart.register(CategoryScale)


type FetchedDataProps={
  id: string,
  symbol: string,
  name: string,
  description:string,
  link: string,
  image: string,
  price: number,
  ath: number,
  ath_date: string,
  atl: number,
  atl_date: string,
  market_cap: number,
  fdl: number,
  volume: number,
  twenty_four_percentage: number,
  total_supply: number,
  max_supply: number,
  circulating_supply: number,
  chartData: []
}

type RequestStateProps =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: FetchedDataProps }
  | { status: 'error', error: Error };

export default function CoinInfo(){
    const [requestState,setRequestedState] = useState<RequestStateProps>({ status: 'idle' })

    const pathname = usePathname()
    const coin = pathname.split('/')[2];
    const currency = useAppSelector(state=>state.changeCurrencyReducer.currency)

    function getCurrency(item:any){
      if(currency === 'usd'){
        return item.usd
      }else if(currency === 'gbp'){
        return item.gbp
      }else if(currency === 'eur'){
        return item.eur
      }
    }

useEffect(() => {
  const abortController = new AbortController()
  const signal  = abortController.signal
  setRequestedState({status:'loading'})
  async function getData(){
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`,{signal})
      const data = await response.data
      console.log(data)
      
      setRequestedState(
        { 
          status: 'success',
          data: {
            id: data.id,
            symbol: data.symbol,
            name: data.name,
            description:data.description.en,
            link: data.links.homepage[0],
            image: data.image.large,
            price: getCurrency(data.market_data.current_price),
            ath: getCurrency(data.market_data.ath),
            ath_date: getCurrency(data.market_data.ath_date),
            atl: getCurrency(data.market_data.atl),
            atl_date: getCurrency(data.market_data.atl_date),
            market_cap: getCurrency(data.market_data.market_cap),
            fdl: getCurrency(data.market_data.fully_diluted_valuation),
            volume: getCurrency(data.market_data.total_volume),
            twenty_four_percentage: data.market_data.price_change_percentage_24h,
            total_supply: data.market_data.total_supply,
            max_supply: data.market_data.max_supply,
            circulating_supply: data.market_data.circulating_supply,
            chartData: data.market_data.sparkline_7d.price
          } 
        }
        
      )
    } catch (error:any) {
      console.log(error)
      setRequestedState({ status: 'error', error: error })
    }
  }
  getData()

  return ()=>abortController.abort()
}, [currency])




var prices = requestState.status==='success' ? reformDataLength(requestState.data.chartData) : []


var priceChart = {
  labels: Array(prices.length).fill(null).map((item,index)=>++index), 
  datasets: [
    {
      label: coin,
      data: prices.map((data) => data),
      backgroundColor: (context: ScriptableContext<"line">) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0, "rgba(116, 116, 242, 1)");
        gradient.addColorStop(1, "rgba(116, 116, 242, 0.08)");
        return gradient;
      },
      borderColor: "rgba(116, 116, 242, 1)",
      borderWidth: 2,
      tension:0.4,
      pointRadius:0,
      fill: 'start',
    }
  ]
}

const isLoading = requestState.status === 'loading'
const coinItem = requestState.status === 'success' ? requestState.data : null
   
   if(isLoading){
    return <div className=" flex item-center justify-center"><DefaultSpinner/></div> 
   }

    return(
        <div className=" px-5 md:px-[70px]  py-5 ">  
            <div className=" h-full md:h-[500px] md:flex w-full items-center gap-4 justify-between mb-10 md:mb-5">
                <div className=" w-full md:w-1/2 h-full rounded-md bg-white dark:bg-[#191932] p-3 mb-8 md:mb-0">
                    <div className="flex items-center">
                        <Image 
                            className=" mr-2 object-contain"
                            src= {coinItem?.image as string}
                            alt="flash_circle"
                            width={30}
                            height={30}
                        />
                        <span className=" text-[24px] md:text-[28px]">{coinItem?.name}</span> 
                    </div>
                    <a className=" underline" href={coinItem?.link} target="_blank">Official Website</a>
                    <h1 className=" my-9 flex items-center justify-between text-[28px] md:text-[40px]">{getCurrencySymbol(currency)}{coinItem?.price}<span className={
                      clsx(
                      " flex items-center text-[16px] md:text-[20px]",
                      {' text-[#00B1A7]' :coinItem?.twenty_four_percentage as number > 0 },
                      {' text-[#FE2264]' :coinItem?.twenty_four_percentage as number < 0 }
                      
                      )}>
                        {coinItem?.twenty_four_percentage as number < 0 ? <IoMdArrowDropdown/> :<IoMdArrowDropup/>}{Math.abs(coinItem?.twenty_four_percentage as number) || ''}%
                      </span></h1>
                    <hr/>
                    <div className="  my-8 flex items-center justify-between">
                        <div>
                            <h3 className=" text-[16px]">All time High:</h3>
                            <span className=" text-[14px]">{changeDate(coinItem?.ath_date as string)}</span>
                        </div>
                        <h1 className=" text-[20px]">{getCurrencySymbol(currency)}{coinItem?.ath}</h1>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className=" text-[16px]">All time High:</h3>
                            <span className=" text-[14px]">{changeDate(coinItem?.atl_date as string)}</span>
                        </div>
                        <h1 className=" text-[20px]">{getCurrencySymbol(currency)}{coinItem?.atl}</h1>
                    </div>
                </div>


                <div className="w-full md:w-1/2 h-full flex flex-col gap-8 md:gap-3">

                    <div className=" h-full md:h-1/2 bg-white dark:bg-[#191932] flex flex-col justify-center p-3 rounded-md">   
                        <h1 className=' text-xl'>Last 7d</h1>
                        {isLoading ? <div className='h-full'>Loading...</div>:<LineChart height="h-full" width=" w-full" chartData={priceChart}/> }       
                    </div>

                    <div className=" h-full md:h-1/2 rounded-md bg-white dark:bg-[#191932] grid grid-cols-2  gap-3 p-[6px] lg:p-3 text-[14px]">
                      <div className="flex flex-col items-center text-[12px] md:text-[14px]"><FaPlusCircle/>MARKET CAP <span className=" font-medium">{getCurrencySymbol(currency,true)} {convertToTrillion(coinItem?.market_cap as number)}T</span></div>
                      <div className="flex flex-col items-center  text-[12px] md:text-[14px]"><FaPlusCircle/>F_DILUTED VALUATION <span className=" font-medium">{getCurrencySymbol(currency,true)} {convertToTrillion(coinItem?.fdl as number)}T</span></div>
                      <div className="flex flex-col items-center  text-[12px] md:text-[14px]"><FaPlusCircle/>VOLUME/MARKET <span className=" font-medium">{getCurrencySymbol(currency,true)} {(coinItem?.volume as number/(coinItem?.market_cap as number)).toFixed(3)}B</span></div>
                      <div className="flex flex-col items-center  text-[12px] md:text-[14px]"><FaPlusCircle/>TOTAL VOLUME(24H) <span className=" font-medium">{getCurrencySymbol(currency,true)} {(convertToBillion(coinItem?.volume as number))}</span></div>
                      <div className="flex flex-col items-center  text-[12px] md:text-[14px]"><FaPlusCircle/>CIRCULATING SUPPLY <span className=" font-medium">{convertToMillion(coinItem?.circulating_supply as number)}M BTC</span></div>
                      <div className="flex flex-col items-center  text-[12px] md:text-[14px]"><FaPlusCircle/>MAX SUPPLY <span className=" font-medium">{convertToMillion(coinItem?.max_supply as number)}M BTC</span></div>
                    </div>
                </div>
            </div>

            <div className="w-full rounded-md bg-white dark:bg-[#191932] p-3">
                <h1 className=" text-[24px] mb-3">About</h1>
                <div className=" text-[14px] dark:text-[#D1D1D1]" dangerouslySetInnerHTML={{ __html: coinItem?.description as string }} />
            </div>

        </div>
    )
}