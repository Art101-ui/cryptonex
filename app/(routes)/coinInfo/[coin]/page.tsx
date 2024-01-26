'use client'
import Image from "next/image"
import bitcoin from '@/public/bitcoin.png'
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { CategoryScale, ScriptableContext } from 'chart.js';
import Chart from "chart.js/auto";
import { reduceData, getDayNumber, prettifyDate } from "@/app/lib/utilis";
import PriceChart from "@/app/ui/home/pricechart";
import axios from "axios";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { StatusProps } from "@/app/lib/type";

Chart.register(CategoryScale)

type CoinProp ={
    id: string,
    symbol:string,
    name: string,
    description:string,
    link:string,
    image:string,
    percentage:number,
    current_price:number,
    ath: number,
    ath_date:string,
    atl: number,
    atl_date: string,
    market_cap: number,
    total_volume: number,
    total_supply:number,
    max_supply:number,
    circulating_supply: number
    fully_diluted_valuation: number
    chartData:any
}

const initialData={
    id: '',
    symbol:'',
    name: '',
    description:'',
    link:'',
    image:'',
    // percentage:0,
    current_price:0,
    ath: 0,
    ath_date:0,
    atl: 0,
    atl_date: '',
    market_cap: 0,
    total_volume: 0,
    total_supply:0,
    max_supply:0,
    circulating_supply:0 ,
    fully_diluted_valuation: 0
}



export default function CoinInfo(){
  const [status,setstatus] = useState<StatusProps>('idle')
  const [newData, setData] = useState<CoinProp | null>(null)
    const pathname = usePathname()
    const coin = pathname.split('/')[2].toLowerCase()



useEffect(() => {
  const abortController = new AbortController()
  const signal = abortController.signal
  async function getData(){
    setstatus('loading')
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true&x_cg_demo_api_key=CG-8CfAjVRc52vDuq5qtrTNDD1p`,{signal})
      const data = await response.data
      console.log(data)
      setData({
        id: data.id,
        symbol:data.symbol,
        name: data.name,
        description:data.description.en,
        link:data.links.homepage[0],
        image:data.image.large,
        percentage: data.market_data.price_change_percentage_24h,
        current_price:data.market_data.current_price.usd,
        ath: data.market_data.ath.usd,
        ath_date:data.market_data.ath_date.usd,
        atl: data.market_data.atl.usd,
        atl_date: data.market_data.atl_date.usd,
        fully_diluted_valuation: data.market_data.fully_diluted_valuation.usd,
        market_cap: data.market_data.market_cap.usd,
        total_volume: data.market_data.total_volume.usd,
        total_supply:data.market_data.total_supply,
        max_supply:data.market_data.max_supply,
        circulating_supply: data.market_data.circulating_supply,
        chartData: data.market_data.sparkline_7d.price
      })
      setstatus('success')
    } catch (error:any) {
      console.log(error)
      setstatus('error')
    }
  }
  getData()

  return ()=> abortController.abort()
}, [])

console.log(newData)

function reformDataLength(listOfArray:[]){
  let newArr:[]=[]
  if(listOfArray.length > 100 && listOfArray.length < 750){
    newArr = reduceData(listOfArray,5)
  }
  return newArr
}

var prices = status==='success' &&  reformDataLength(newData?.chartData) || []

var priceChart = {
  labels: Array(prices.length).fill(null).map((item,i)=>++i), 
  datasets: [
    {
      label: newData?.name,
      data: prices.map((data) => data),
      backgroundColor: (context: ScriptableContext<"line">) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0, "rgba(116, 116, 242, 0.7)");
        gradient.addColorStop(1, "rgba(116, 116, 242, 0.08)");
        return gradient;
      },
      borderColor: "rgba(116, 116, 242, 1)",
      yAxisID:'y-axis-1',
      borderWidth: 1,
      tension:0.4,
      pointRadius:0,
      fill: 'start',
    }
  ]
}

const isLoading = status === 'loading'

   if(isLoading){
    return <div>Loading...</div>
   }

    return(
        <div className="px-[70px]  py-5 ">  
            <div className="h-[500px] flex w-full items-center gap-4 justify-between mb-5">
                <div className=" w-1/2 h-full rounded-md bg-white p-3">
                    <div className="flex items-center">
                        <Image 
                            className=" mr-2 object-contain"
                            src= {newData?.image as string}
                            alt="flash_circle"
                            width={30}
                            height={30}
                        />
                        <span className=" text-[28px]">{newData?.name}</span> 
                    </div>
                    <a href={newData?.link} target="_blank">Official Website</a>
                    <h1 className=" my-6 flex items-center text-[40px]">${newData?.current_price}<span className=" ml-3 flex items-center text-[20px]"><IoMdArrowDropdown/>{newData?.percentage}%</span></h1>
                    <h2 className=" mb-11 text-[20px]">Profit: $1,504</h2>
                    <hr />
                    <div className=" my-4 flex items-center justify-between">
                        <div>
                            <h3 className=" text-[16px]">All time High:</h3>
                            <span className=" text-[14px]">{prettifyDate(newData?.ath_date || '') }</span>
                        </div>
                        <h1 className=" text-[20px]">${newData?.ath}</h1>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className=" text-[16px]">All time Low:</h3>
                            <span className=" text-[14px]">{prettifyDate(newData?.atl_date || '')}</span>
                        </div>
                        <h1 className=" text-[20px]">${newData?.atl}</h1>
                    </div>
                </div>


                <div className=" w-1/2 h-full flex flex-col gap-3">

                    <div className=" h-1/2 bg-white flex flex-col justify-center p-3 rounded-md">   
                        <h1 className=' text-xl'>Last 7d</h1>
                        {isLoading ? <div className='h-full'>Loading...</div>:<PriceChart chartData={priceChart} height=' h-full'/> }       
                    </div>

                    <div className=" h-1/2 rounded-md bg-white grid grid-cols-2  gap-3 p-3">
                        <div className="flex flex-col items-center"><FaPlusCircle/>Market Cap <span className=" font-medium"> ${(newData?.market_cap as number / 1e9).toFixed(2)}B</span></div>
                        <div className="flex flex-col items-center"><FaPlusCircle/>Fully Diluted Valuation<span className=" font-medium">${(newData?.fully_diluted_valuation as number / 1e9).toFixed(2)}B</span></div>
                        <div className="flex flex-col items-center"><FaPlusCircle/>Volume / Market <span className=" font-medium">${}</span></div>
                        <div className="flex flex-col items-center"><FaPlusCircle/>Total Volume <span className=" font-medium">${(newData?.total_volume as number / 1e9).toFixed(2)}B</span></div>
                        <div className="flex flex-col items-center"><FaPlusCircle/>Circulating Supply <span className=" font-medium">${(newData?.circulating_supply as number/ 1e9).toFixed(2)}B</span></div>
                        <div className="flex flex-col items-center"><FaPlusCircle/>Max Supply <span className=" font-medium">${Math.round(newData?.total_volume as number / 1e9)}B</span></div>
                    </div>
                </div>
            </div>

            <div className="w-full rounded-md bg-white p-3">
                <h1 className=" text-[24px] mb-3">About</h1>
                <div dangerouslySetInnerHTML={{ __html: newData?.description || ''  }} />

            </div>

        </div>
    )
}