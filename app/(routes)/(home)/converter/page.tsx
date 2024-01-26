'use client'

import bitcoin from '@/public/bitcoin.png'
import Image from "next/image"
import { RiArrowUpSFill } from "react-icons/ri";
import verticalSwitch from '@/public/verticalSwitch.png'
import { CategoryScale, ScriptableContext } from 'chart.js';
import { getDayNumber, reduceData } from '@/app/lib/utilis';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PriceChart from '@/app/ui/home/pricechart';
import clsx from 'clsx';
import Chart from "chart.js/auto";


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
  
const timelineData= [
    {id: 0, value: '1D', days:1},
    {id: 1, value: '7D', days:7}, 
    {id: 2, value: '14D',days:14}, 
    {id: 3, value: '1M', days:30},
    {id: 4, value: '1Y', days:365}, 
    {id: 5, value: '5Y', days:1825},
    {id: 6, value: 'Max', days:'max'}
]

export default function Converter(){
   
    const [requestState,setRequestedState] = useState<RequestStateProps>({ status: 'idle' })
      const [timeline,setTimeline] = useState<number | string>(1)

 

 
  // useEffect(() => {
  //   setRequestedState({status:'loading'})
  //   async function getData(){
  //     try {
  //       const response = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${timeline}?api_key=CG-8CfAjVRc52vDuq5qtrTNDD1p`)
  //       const data = await response.data
  //       console.log(data)
  //       setRequestedState({ status: 'success', data: data })
  //     } catch (error:any) {
  //       console.log(error)
  //       setRequestedState({ status: 'error', error: error })
  //     }
  //   }
  //   getData()
  // }, [timeline])

  

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
        label: "Bitcoin",
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
        <>
          <h1 className=" text-[#424286] text-[20px]">Online currency converter</h1>
          <h3 className=" text-[#424286]/80 text-[16px] mb-7">09/29/2023 14:15</h3>  

          <div className="flex relative items-center justify-between gap-7 mb-8">

            <div className="bg-white rounded-2xl p-6  w-1/2">
              <p className='mb-2'>You sell</p>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-1'>
                    <Image 
                    className=" mr-1"
                    src= {bitcoin}
                    alt="exchange"
                    width={20}
                    height={20}
                    />
                    <p className=' mr-1'>Bitcoin(BTC)</p>
                    <RiArrowUpSFill/>
                </div>
                <input value={10} className=' remove-arrow border-none bg-transparent outline-none px-3 py-3 focus:outline-none text-right' type="number" />
              </div>
              <hr />
              <h3 className='py-1'>1 BTC = $26,250.15</h3>
            </div>


            <div className=' absolute left-1/2 transform -translate-x-1/2 bg-[#353570] rounded-full w-12 h-12 flex justify-center items-center cursor-pointer'>
                   <Image 
                    src= {verticalSwitch}
                    alt="exchange"
                    width={24}
                    height={24}
                    />
            </div>

            <div className="bg-white  rounded-2xl p-6   w-1/2">
              <p className='mb-2'>You buy</p>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-1'>
                    <Image 
                    className=" mr-1"
                    src= {bitcoin}
                    alt="exchange"
                    width={20}
                    height={20}
                    />
                    <p  className=' mr-1'>Bitcoin(BTC)</p>
                    <RiArrowUpSFill/>
                </div>
                <input value={10}  className=' remove-arrow border-none bg-transparent outline-none py-3 px-3 focus:outline-none text-right' type="number" />
              </div>
              <hr />
              <h3 className='py-1'>1 BTC = $26,250.15</h3>
            </div>
          </div>

          <div className=" w-full flex flex-col justify-center  h-[290px] p-6 bg-white mb-4 rounded-md">
            <h1 className=' text-xl'>Bitcoin (BTC) to Ethereum (ETH)</h1>
            {isLoading ? <div className='h-full'>Loading...</div>:<PriceChart chartData={priceChart} height=' h-full'/> }
          </div>

          <div className=" bg-[#CCCCFA] h-[42px] w-[490px] p-[2px]  gap-2 rounded-md flex">
            {timelineData.map((item)=>{
            return(
                <div key={item.id} className={clsx(
                "  px-5 py-2 text-[14px] grow flex items-center p-2 rounded-md cursor-pointer ",
                {'bg-[#6161D6]' : timeline === item.days}
                )}
                onClick={()=>setTimeline(item.days)}
                >
                {item.value}</div>
            )
            })}
         </div>
        </>
    )
}