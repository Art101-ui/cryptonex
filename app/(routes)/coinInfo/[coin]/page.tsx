'use client'
import Image from "next/image"
import bitcoin from '@/public/bitcoin.png'
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { CategoryScale, ScriptableContext } from 'chart.js';
import Chart from "chart.js/auto";
import { reduceData, getDayNumber } from "@/app/lib/utilis";
import PriceChart from "@/app/ui/home/pricechart";
import axios from "axios";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

Chart.register(CategoryScale)


type FetchedDataProps={
    prices:[],
    market_caps:[],
    total_volumes:[]
  }

type RequestStateProps =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: FetchedDataProps }
  | { status: 'error', error: Error };

export default function CoinInfo(){
    const [requestState,setRequestedState] = useState<RequestStateProps>({ status: 'idle' })

    const pathname = usePathname()
    const coin = pathname.split('/')[2].toLowerCase()



useEffect(() => {
  setRequestedState({status:'loading'})
  async function getData(){
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`)
      const data = await response.data
      console.log(data)
      
      setRequestedState({ status: 'success', data: data })
    } catch (error:any) {
      console.log(error)
      setRequestedState({ status: 'error', error: error })
    }
  }
  getData()
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

var prices = requestState.status==='success' ? reformDataLength(requestState.data.prices) : []

const reformedPrices = prices.map((item)=>{
  return {time:getDayNumber(item[0]), value:item[1]}
}) 

var priceChart = {
  labels: reformedPrices.map((data) => data.time), 
  datasets: [
    {
      label: coin,
      data: reformedPrices.map((data) => data.value),
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



    return(
        <div className="px-[70px]  py-5 ">  
            <div className="h-[500px] flex w-full items-center gap-4 justify-between mb-5">
                <div className=" w-1/2 h-full rounded-md bg-white p-3">
                    <div className="flex items-center">
                        <Image 
                            className=" mr-2 object-contain"
                            src= {bitcoin}
                            alt="flash_circle"
                            width={30}
                            height={30}
                        />
                        <span className=" text-[28px]">{coin}</span> 
                    </div>
                    <a href="https://www.bitcoin.org/" target="_blank">www.bitcoin.org</a>
                    <h1 className=" my-6 flex items-center text-[40px]">$41,625.34 <span className=" ml-3 flex items-center text-[20px]"><IoMdArrowDropdown/>0.7%</span></h1>
                    <h2 className=" mb-11 text-[20px]">Profit: $1,504</h2>
                    <hr />
                    <div className=" my-4 flex items-center justify-between">
                        <div>
                            <h3 className=" text-[16px]">All time High:</h3>
                            <span className=" text-[14px]">Tue, Jul 24, 2018</span>
                        </div>
                        <h1 className=" text-[20px]">$1.32</h1>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className=" text-[16px]">All time High:</h3>
                            <span className=" text-[14px]">Tue, Jul 24, 2018</span>
                        </div>
                        <h1 className=" text-[20px]">$1.32</h1>
                    </div>
                </div>


                <div className=" w-1/2 h-full flex flex-col gap-3">

                    <div className=" h-1/2 bg-white flex flex-col justify-center p-3 rounded-md">   
                        <h1 className=' text-xl'>Last 7d</h1>
                        {isLoading ? <div className='h-full'>Loading...</div>:<PriceChart chartData={priceChart} height=' h-full'/> }       
                    </div>

                    <div className=" h-1/2 rounded-md bg-white grid grid-cols-2  gap-3 p-3">
                        <div className="flex flex-col items-center"><FaPlusCircle/>Market Cap <span className=" font-medium"> $749,864,345,056</span></div>
                        <div className="flex flex-col items-center"><FaPlusCircle/>Volume 24h <span className=" font-medium">$749,864,345,056</span></div>
                        <div className="flex flex-col items-center"><FaPlusCircle/>Volume / Market <span className=" font-medium">$749,864,345,056</span></div>
                        <div className="flex flex-col items-center"><FaPlusCircle/>Total Volume <span className=" font-medium">$749,864,345,056</span></div>
                        <div className="flex flex-col items-center"><FaPlusCircle/>Circulating Supply <span className=" font-medium">$749,864,345,056</span></div>
                        <div className="flex flex-col items-center"><FaPlusCircle/>Max Supply <span className=" font-medium">$749,864,345,056</span></div>
                    </div>
                </div>
            </div>

            <div className="w-full rounded-md bg-white p-3">
                <h1 className=" text-[24px] mb-3">About</h1>
                <p>Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process. Bitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks. Bitcoin is designed to have only 21 million BC ever created, thus making it a deflationary currency. Bitcoin uses the SHA-256 hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes. Being the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as Litecoin, Peercoin, Primecoin, and so on. The cryptocurrency then took off with the innovation of the turing-complete smart contract by Ethereum which led to the development of other amazing projects such as EOS, Tron, and even crypto-collectibles such as Cryptokitties.</p>
            </div>

        </div>
    )
}