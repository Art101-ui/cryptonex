'use client'
import Image from "next/image"
import bitcoin from '@/public/bitcoin.png'
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { CategoryScale, ScriptableContext } from 'chart.js';
import Chart from "chart.js/auto";
import { reduceData, getDayNumber, changeDate, convertToTrillion, convertToBillion, convertToMillion } from "@/app/lib/utilis";
import PriceChart from "@/app/ui/home/pricechart";
import axios from "axios";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LineChart from "@/app/ui/home/linechart";
import clsx from "clsx";


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
    const coin = pathname.split('/')[2]



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
            price: data.market_data.current_price.usd,
            ath: data.market_data.ath.usd,
            ath_date: data.market_data.ath_date.usd,
            atl: data.market_data.atl.usd,
            atl_date: data.market_data.atl_date.usd,
            market_cap: data.market_data.market_cap.usd,
            fdl:data.market_data.fully_diluted_valuation.usd,
            volume: data.market_data.total_volume.usd,
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
}, [])



function reformDataLength(listOfArray:[]){
  let newArr:[]=[]
  if(listOfArray.length > 100 && listOfArray.length < 750){
    newArr = reduceData(listOfArray,20)
  }else if(listOfArray.length <= 2000 ){
      newArr = reduceData(listOfArray,80)
  }else if(listOfArray.length <= 4000 ){
      newArr = reduceData(listOfArray,200)
  }
  return newArr
}
// console.log(requestState.status==='success' && requestState.data.market_data.sparkline_7d.prices)
var prices = requestState.status==='success' ? reformDataLength(requestState.data.chartData) : []

const reformedPrices = prices.map((item)=>{
  return {time:getDayNumber(item[0]), value:item[1]}
}) 

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


    return(
        <div className="px-[70px]  py-5 ">  
            <div className="h-[500px] flex w-full items-center gap-4 justify-between mb-5">
                <div className=" w-1/2 h-full rounded-md bg-white p-3">
                    <div className="flex items-center">
                        <Image 
                            className=" mr-2 object-contain"
                            src= {coinItem?.image as string}
                            alt="flash_circle"
                            width={30}
                            height={30}
                        />
                        <span className=" text-[28px]">{coinItem?.name}</span> 
                    </div>
                    <a className=" underline" href={coinItem?.link} target="_blank">Official Website</a>
                    <h1 className=" my-9 flex items-center justify-between text-[40px]">${coinItem?.price}<span className={
                      clsx(
                      " flex items-center text-[20px]",
                      {' text-[#00B1A7]' :coinItem?.twenty_four_percentage as number > 0 },
                      {' text-[#FE2264]' :coinItem?.twenty_four_percentage as number < 0 }
                      
                      )}>
                        {coinItem?.twenty_four_percentage as number < 0 ? <IoMdArrowDropdown/> :<IoMdArrowDropup/>}{Math.abs(coinItem?.twenty_four_percentage as number)}%
                      </span></h1>
                    <hr/>
                    <div className="  my-8 flex items-center justify-between">
                        <div>
                            <h3 className=" text-[16px]">All time High:</h3>
                            <span className=" text-[14px]">{changeDate(coinItem?.ath_date as string)}</span>
                        </div>
                        <h1 className=" text-[20px]">${coinItem?.ath}</h1>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className=" text-[16px]">All time High:</h3>
                            <span className=" text-[14px]">{changeDate(coinItem?.atl_date as string)}</span>
                        </div>
                        <h1 className=" text-[20px]">${coinItem?.atl}</h1>
                    </div>
                </div>


                <div className=" w-1/2 h-full flex flex-col gap-3">

                    <div className=" h-1/2 bg-white flex flex-col justify-center p-3 rounded-md">   
                        <h1 className=' text-xl'>Last 7d</h1>
                        {isLoading ? <div className='h-full'>Loading...</div>:<LineChart height="h-full" width=" w-full" chartData={priceChart}/> }       
                    </div>

                    <div className=" h-1/2 rounded-md bg-white grid grid-cols-2  gap-3 p-3 text-[14px]">
                        <div className="flex flex-col items-center"><FaPlusCircle/>MARKET CAP <span className=" font-medium">USD {convertToTrillion(coinItem?.market_cap as number)}T</span></div>
                        <div className="flex flex-col items-center"><FaPlusCircle/>FULLY DILUTED VALUATION <span className=" font-medium">USD {convertToTrillion(coinItem?.fdl as number)}T</span></div>
                        <div className="flex flex-col items-center"><FaPlusCircle/>VOLUME/MARKET <span className=" font-medium">USD {(coinItem?.volume as number/(coinItem?.market_cap as number)).toFixed(3)}B</span></div>
                        <div className="flex flex-col items-center"><FaPlusCircle/>TOTAL VOLUME(24H) <span className=" font-medium">USD {(convertToBillion(coinItem?.volume as number))}</span></div>
                        <div className="flex flex-col items-center"><FaPlusCircle/>CIRCULATING SUPPLY <span className=" font-medium">{convertToMillion(coinItem?.circulating_supply as number)}M BTC</span></div>
                        <div className="flex flex-col items-center"><FaPlusCircle/>MAX SUPPLY <span className=" font-medium">{convertToMillion(coinItem?.max_supply as number)}M BTC</span></div>
                    </div>
                </div>
            </div>

            <div className="w-full rounded-md bg-white p-3">
                <h1 className=" text-[24px] mb-3">About</h1>
                <div className=" text-[14px]" dangerouslySetInnerHTML={{ __html: coinItem?.description as string }} />
            </div>

        </div>
    )
}