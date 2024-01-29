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
import { CategoryScale, ScriptableContext, } from "chart.js";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { getDayNumber, reduceData, convertToThousand } from "@/app/lib/utilis";
import VolumeChart from "@/app/ui/home/volumechart";
import clsx from "clsx";
import CoinListHeading from "@/app/ui/home/coinlistheading";
import Coin from "@/app/ui/home/coin";
import CoinList from "@/app/ui/home/coinlist";
import { ChartDataProps, StatusProps } from "@/app/lib/type";
import { request } from "http";


Chart.register(CategoryScale)
type CoinListProp ={
    id: string;
    name:string,
    price:number,
    image:string,
    percentage:number
}
const coinlist:CoinListProp[]=[
  {id:'bitcoin', name:'Bitcoin (BTC)',price:220, image:'', percentage:1.23},
  {id:'ethereum', name:'Ethereum (ETH)',price:220, image:'', percentage:1.23},
  {id:'tether', name:'Tether (USDT)',price:220, image:'', percentage:1.23},
  {id:'usd-coin', name:'USDC (USDC)',price:220, image:'', percentage:1.23},
  {id:'dogecoin', name:'Doge Coin (DGC)',price:220, image:'', percentage:1.23},
  {id:'litecoin', name:'Litecoin (LTC)',price:220, image:'', percentage:1.23},
  {id:'solana', name:'Solana (SOL)',price:220, image:'', percentage:1.23},
  {id:'ripple', name:'XRP (XRP)',price:220, image:'', percentage:1.23},
  {id:'binancecoin', name:'BNB (BNB)',price:220, image:'', percentage:1.23},
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



type RequestDataProps ={
  id: string,
  data:any
}

export default function Home() {
  const [status, setStatus] = useState<StatusProps>('idle')
 const [requestData,setRequestedData] = useState<RequestDataProps[]>([])
 const [timeline,setTimeline] = useState<number | string>(1)
 const [coins, setCoins] = useState<CoinListProp[]>([])
 const [selectedIds,setSelectedIds] = useState<string[]>(['bitcoin'])
 const [coinstatus,setcoinStatus] = useState<StatusProps>('idle')
  
//  useEffect(() => {
//    const abortController = new AbortController();
//    const signal = abortController.signal;
//    async function getData(){
//      setStatus('loading')
//      if(selectedIds.length > 0){
//        const latestId = selectedIds[selectedIds.length-1]
       
//        console.log(latestId)
//        if(!requestData.some(data=>data.id === latestId)){
//          try { 
//            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${latestId}/market_chart?vs_currency=usd&days=1`,{signal})
//            setStatus('success')
//            setRequestedData((prev)=>[...prev,{id:latestId,data:response.data}])
//          } catch (error:any) {
//            console.log(error)
//            setStatus('error')
//          }
//        }else{
//         setStatus('idle')
//         return
//        }
//      }
//    }
//     getData()
//     return () => abortController.abort();
//   }, [selectedIds])

  // useEffect(() => {
  //   const abortController = new AbortController()
  //   const signal = abortController.signal
  //   async function getMainCoin() {
  //     setcoinStatus('loading')
  //     try {
  //       const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en',{signal})
  //       const formattedData:CoinListProp[]
  //        = response.data.map((item:any)=>{
  //         return {
  //           id:item.id,
  //           name:item.name,
  //           price:item.current_price,
  //           image:item.image,
  //           percentage:item.price_change_percentage_24h
  //         }
  //       })
  //       setCoins(formattedData)
  //       setcoinStatus('success')
  //     } catch (error) {
  //       console.log(error)
  //       setcoinStatus('error')
  //     }
      
  //   }
  //   getMainCoin()
  
  //   return ()=>abortController.abort()
  // }, [])
  
  // console.log(coins)

  async function getDataByTimeLine(days:any){
    setStatus('loading')  
        try {
          selectedIds.map(async(item)=>{
            try {
              const response =  await axios.get(`https://api.coingecko.com/api/v3/coins/${item}/market_chart?vs_currency=usd&days=${days}`)
              setRequestedData((prevData) => {
               return prevData.map((value) => {
                 if (value.id === item) {
                   return { ...value, data: response.data } as RequestDataProps;
                 }
                 return value;
               });
             });
              
            } catch (error:any) {
              setStatus('error')
              console.log(error)
            }    
           })
         //  const coinData = await Promise.all(request)
          setStatus('success')
        } catch (error:any) {
          console.log(error)
          setStatus('error')
        }
  }


  console.log(requestData)
  function handleSelect(id:string){ 
    if (selectedIds.some(selectedId=>selectedId===id)) {
      setSelectedIds(selectedIds.filter(selectedId=>selectedId!==id))
      setRequestedData(requestData.filter(item=>item.id !== id))
    }else{
      if(selectedIds.length<3){
        setSelectedIds([...selectedIds,id])
      }else{
        return
      }
    }   
  }
  

  // function reformDataLength(listOfArray:[]){
  //   let newArr:[]=[]
  //   if(listOfArray.length > 100 && listOfArray.length < 750){
  //     newArr = reduceData(listOfArray,20)
  //   }else if(listOfArray.length <= 2000 ){
  //       newArr = reduceData(listOfArray,80)
  //   }else if(listOfArray.length <= 4000 ){
  //       newArr = reduceData(listOfArray,200)
  //   }
  //   return newArr
  // }

  const prices = requestData.map(item=>{
    let newArr:[]=[]
    if(item.data.prices.length > 100 && item.data.prices.length < 750){
      newArr = reduceData(item.data.prices,20)
    }else if(item.data.prices.length <= 2000 ){
        newArr = reduceData(item.data.prices,80)
    }else if(item.data.prices.length <= 4000 ){
        newArr = reduceData(item.data.prices,200)
    }
    return newArr
  })||[]

  const volumes =  requestData.map(item=>{
    let newArr:[]=[]
    if(item.data.total_volumes.length > 100 && item.data.total_volumes.length < 750){
      newArr = reduceData(item.data.total_volumes,20)
    }else if(item.data.total_volumes.length <= 2000 ){
        newArr = reduceData(item.data.total_volumes,80)
    }else if(item.data.total_volumes.length <= 4000 ){
        newArr = reduceData(item.data.total_volumes,200)
    }
    return newArr
  })||[]

  // Price Chart
  const firstreformedPrice = prices && prices.length > 0 ?  prices[0].map((item)=>{
      return {time:getDayNumber(item[0]), value:item[1]}
    }) : [] 
  const secondreformedPrice = prices && prices.length > 1 ? prices[1].map((item)=>{
      return {time:getDayNumber(item[0]), value:item[1]}
    }) : [] 

  const thirdreformedPrice = prices && prices.length > 2 ? prices[2].map((item)=>{
      return {time:getDayNumber(item[0]), value:item[1]}
    }) : [] 

    // Volume Chart
  const firstreformedVolume =volumes && volumes.length > 0 ? volumes[0].map((item)=>{
      return {time:getDayNumber(item[0]), value:item[1]}
    }) : [] 
  const secondreformedVolume =volumes && volumes.length > 1 ? volumes[1].map((item)=>{
      return {time:getDayNumber(item[0]), value:item[1]}
    }) : [] 
  const thirdreformedVolume =volumes && volumes.length > 2 ? volumes[2].map((item)=>{
      return {time:getDayNumber(item[0]), value:item[1]}
    }) : [] 

  
  // var prices = status==='success' ? reformDataLength(requestData[0].prices) : []
  // var volumes = status==='success' ? reformDataLength(requestData.total_volumes) : []

  // const reformedPrices = prices.map((item)=>{
  //   return {time:getDayNumber(item[0]), value:item[1]}
  // }) 
  // const reformedVolumes =volumes.map((item)=>{
  //   return {time:getDayNumber(item[0]), value:item[1]}
  // })
  
  
  var priceChart = {
    labels: firstreformedPrice.map((data) => data.time), 
    datasets: [
      {
        label: "Bitcoin",
        data: firstreformedPrice.map((data) => data.value),
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
      },
      {
        label: "Ethereum",
        data: secondreformedPrice.map((data) => data.value),
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 250);
          gradient.addColorStop(0, "rgba(38, 161, 123, 0.7)");
          gradient.addColorStop(1, "rgba(38, 161, 123, 0.08)");
          return gradient;
        },
        borderColor: "rgba(38, 161, 123, 1)",
        borderWidth: 1,
        yAxisID:'y-axis-2',
        tension:0.4,
        pointRadius:0,
        fill: 'start',
      },
      {
        label: "Tether",
        data: thirdreformedPrice.map((data) => data.value),
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 250);
          gradient.addColorStop(0, "rgba(254, 34, 100, 0.7)");
          gradient.addColorStop(1, "rgba(254, 34, 100, 0.08)");
          return gradient;
        },
        borderColor: "rgba(254, 34, 100, 1)",
        borderWidth: 1,
        yAxisID:'y-axis-3',
        tension:0.4,
        pointRadius:0,
        fill: 'start',
      },
    ]
  }

  console.log('first chart',firstreformedPrice)
  console.log('second chart',secondreformedPrice)
  console.log('third chart',thirdreformedPrice)


  var volumeChart = {
    labels: firstreformedVolume.map((data) => data.time), 
    datasets: [
      {
        label: "Bitcoin",
        data: firstreformedVolume.map((data) => data.value),
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
      },
      {
        label: "Ethereum",
        data: secondreformedVolume.map((data) => data.value),
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 250);
          gradient.addColorStop(0, "rgba(38, 161, 123, 0.7)");
          gradient.addColorStop(1, "rgba(38, 161, 123, 0.08)");
          return gradient;
        },
        borderColor: "rgba(38, 161, 123, 1)",
        borderWidth: 1,
        yAxisID:'y-axis-2',
        tension:0.4,
        pointRadius:0,
        fill: 'start',
      },
      {
        label: "Tether",
        data: thirdreformedVolume.map((data) => data.value),
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 250);
          gradient.addColorStop(0, "rgba(254, 34, 100, 0.7)");
          gradient.addColorStop(1, "rgba(254, 34, 100, 0.08)");
          return gradient;
        },
        borderColor: "rgba(254, 34, 100, 1)",
        borderWidth: 1,
        yAxisID:'y-axis-3',
        tension:0.4,
        pointRadius:0,
        fill: 'start',
      },
    ]
  }


  const isLoading = status === 'loading'
  

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
              {
              // coinstatus === 'loading' ? <div>Loading...</div> : 
              
              coinlist.map((item)=>{
                return (
                  <SwiperSlide  key={item.id} className=' px-2'>
                    <CoinBox onSelect={handleSelect} selectedIds={selectedIds} coin={item}/>
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
            onClick={()=>{
              setTimeline(item.days)
              getDataByTimeLine(item.days)
            }}
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
