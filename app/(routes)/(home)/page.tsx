'use client'
import { LuBarChart3 } from "react-icons/lu";
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper-bundle.css";
import 'swiper/css/navigation';
import '@/app/ui/home/mySwiper.css'
import { Navigation } from 'swiper/modules';


import CoinBox from "@/app/ui/home/coinbox";
import PriceChart from "@/app/ui/home/pricechart";
import { CategoryScale, ScriptableContext } from "chart.js";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { getDayNumber, reduceData } from "@/app/lib/utilis";
import VolumeChart from "@/app/ui/home/volumechart";
import clsx from "clsx";
import CoinListHeading from "@/app/ui/home/coinlistheading";
import Coin from "@/app/ui/home/coin";
import CoinList from "@/app/ui/home/coinlist";


Chart.register(CategoryScale)
const coinlist=[
  {id:0, coin:'Bitcoin (BTC)'},
  {id:1, coin:'Ethereum (ETH)'},
  {id:2, coin:'Tether (USDT)'},
  {id:3, coin:'Doge Coin (DGC)'},
  {id:4, coin:'Doge Coin (DGC)'},
  {id:5, coin:'Doge Coin (DGC)'},
  {id:6, coin:'Doge Coin (DGC)'},
  {id:7, coin:'Doge Coin (DGC)'},
]

const timelineData= [
 
{id: 0, value: '1D', days:1},
{id: 1, value: '7D', days:7}, 
{id: 2, value: '14D',days:14}, 
{id: 3, value: '1M', days:30},
{id: 4, value: '1Y', days:365}, 
{id: 5, value: '5Y', days:1825},
{id: 6, value: 'Max', days:'max'}
]

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

type FunctionProp ={
  listOfArray:[],
}
export default function Home() {
 const [requestState,setRequestedState] = useState<RequestStateProps>({ status: 'idle' })
 const [timeline,setTimeline] = useState<number | string>(1)

 

 
  useEffect(() => {
    setRequestedState({status:'loading'})
    async function getData(){
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${timeline}`)
        const data = await response.data
        console.log(data)
        setRequestedState({ status: 'success', data: data })
      } catch (error:any) {
        console.log(error)
        setRequestedState({ status: 'error', error: error })
      }
    }
    getData()
  }, [timeline])

  

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
  var volumes = requestState.status==='success' ? reformDataLength(requestState.data.total_volumes) : []

  const reformedPrices = prices.map((item)=>{
    return {time:getDayNumber(item[0]), value:item[1]}
  }) 
  const reformedVolumes =volumes.map((item)=>{
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
        borderWidth: 1,
        tension:0.8,
        pointRadius:0,
        fill: 'start',
      }
    ]
  }
//   rgba(116, 116, 242, 0.6)
// rgba(116, 116, 242, 0.01)

// "rgba(157, 98, 217, 1)",
//           "rgba(179, 116, 242, 0.01)"

  var volumeChart = {
    labels: reformedVolumes.map((data) => data.time), 
    datasets: [
      {
        label: "Bitcoin",
        data: reformedVolumes.map((data) => data.value),
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 250);
          gradient.addColorStop(0, "rgba(157, 98, 217, 1)");
          gradient.addColorStop(1, "rgba(179, 116, 242, 0.08");
          return gradient;
        },
        borderColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 0);
          gradient.addColorStop(0, "rgba(157, 98, 217, 1)");
          gradient.addColorStop(1, "rgba(179, 116, 242, 0.6");
          return gradient;
        },
        borderWidth: 2
      }
    ]
  }


  const isLoading = requestState.status === 'loading'
  

  return (
    <div>
      <main className=" mb-10">
        <div className="flex justify-between items-center mb-6">
          <p>Select the currency to view statistics</p>
          <button className=" bg-white rounded py-2 px-3 flex items-center justify-center">
            <LuBarChart3 className = 'mr-2'/>
            Compare</button>
        </div>

      <div className="relative mb-8">
          <Swiper
              slidesPerView={5}
              spaceBetween={1}
              navigation={true}
              modules={[Navigation]}
              style={{marginRight:'25px',marginLeft:'25px',position: 'unset' }}
          >
              {coinlist.map((item,index)=>{
                return (
                  <SwiperSlide  key={item.id} className=' px-2'>
                    <CoinBox coin={item.coin}/>
                  </SwiperSlide>
                )
              })}
          </Swiper>

      </div>
      <div className=" flex items-center mb-6  justify-between">
        <div className=" w-[570px]  h-[400px] p-5 bg-white rounded-md">

         {isLoading ? <div>Loading...</div>:<PriceChart showHeading={true} height=' h-[250px]' chartData={priceChart}/> }
        </div>
        <div className=" w-[570px]  h-[400px] p-5 bg-white rounded-md">
         {isLoading ? <div>Loading...</div>:<VolumeChart  chartData={volumeChart}/>}
        </div>
      </div>
      <div className=" bg-[#CCCCFA] h-[42px] w-[490px] p-[2px]  gap-2 rounded-md flex">
         {timelineData.map((item,index)=>{
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
      </main>
      <section>
        <div className="mb-6">
          <div className="mb-3">
            <CoinListHeading/>
          </div>
           <CoinList/>
        </div>
        
      </section>
    </div>
  )
}
