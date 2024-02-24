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
import { useEffect, useState } from "react";
import VolumeChart from "@/app/ui/home/volumechart";
import clsx from "clsx";
import CoinListHeading from "@/app/ui/home/coinlistheading";
import CoinList from "@/app/ui/home/coinlist";
import { ChartDataProps, FetchedDataProps, StatusProps } from "@/app/lib/type";
import { request } from "http";
import { AppDispatch, useAppSelector } from "@/redux/store";
import  DefaultSpinner  from "@/app/ui/loadingSpinner";
import { useDispatch } from "react-redux";
import { addSelectedId, fetchCoinChart, removeSelectedId } from "@/redux/features/mainCoinChart-slice";


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
  const {coins,status} = useAppSelector((state)=> state.coinstableReducer);
  const {chartCoins,selectedCoins} = useAppSelector((state)=> state.mainCoinChartReducer);
  const dispatch = useDispatch<AppDispatch>()

 const [requestData,setRequestedData] = useState<RequestDataProps[]>([])
 const [timeline,setTimeline] = useState<number | string>(1)

 const [selectedIds,setSelectedIds] = useState<string[]>([])
  
 const [data,setData] = useState<FetchedDataProps[]>([]);
 const [datastatus,setDataStatus] = useState<'loading' | 'error' | 'idle' | 'success'>('idle');
 


 useEffect(() => {
   setData(coins)
 }, [coins])
 
 useEffect(() => {
   setDataStatus(status);
 }, [datastatus])

 useEffect(() => {
   setRequestedData(chartCoins)
 }, [chartCoins])

 useEffect(() => {
   setSelectedIds(selectedCoins)
 }, [selectedCoins])
 

  async function getDataByTimeLine(days:any){
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
              console.log(error)
            }    
           })
        } catch (error:any) {
          console.log(error)    
        }
  }

  function handleSelect(id:string){ 
    if (selectedIds.some(selectedId=>selectedId===id)) {
      dispatch(removeSelectedId(id))
    }else{
      if(selectedIds.length<3){
        dispatch(addSelectedId(id))
        dispatch(fetchCoinChart(id));
      }else{
        return
      }
    }   
  }

  const isLoading = datastatus === 'loading'

  return (
    <div>
      <main className=" mb-10">
        <div className="flex justify-between items-center mb-6">
          <p className=" dark:text-[#D1D1D1]">Select the currency to view statistics</p>
          <button className=" bg-white dark:bg-[#232336] rounded py-2 px-3 flex items-center justify-center">
            <LuBarChart3 className = 'mr-2'/>
            Compare</button>
        </div>

        {/* Swiper */}
          <div className="relative mb-8 max-w-[1200px] ">
              <Swiper
                  slidesPerView={4}
                  spaceBetween={50}
                  navigation={true}
                  modules={[Navigation]}
                  className=" flex gap-5 flex-nowrap"
                  style={{marginRight:'25px',marginLeft:'25px',position: 'unset'}}
              >       
                  <ul className="">
                    {data.map((item)=>{
                      return (
                        <SwiperSlide  key={item.id} className=' px-2'>
                          <CoinBox onSelect={handleSelect} selectedIds={selectedIds} coin={item}/>
                        </SwiperSlide>
                      )
                    })}
                  </ul>             
              </Swiper>
          </div>

        <div className=" flex items-center mb-6  justify-between">
          <div className=" w-[570px]  h-[400px] p-5 bg-white rounded-md">
            {isLoading ? <div className=" w-full h-full flex items-center justify-center"><DefaultSpinner/></div> : <PriceChart selectedIds={selectedIds}  showHeading={true} height=' h-[250px]' chartData={requestData}/> }
          </div>
          <div className=" w-[570px]  h-[400px] p-5 bg-white rounded-md">
            {isLoading ? <div className=" w-full h-full flex items-center justify-center"><DefaultSpinner/></div> : <VolumeChart  chartData={requestData}/>}
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

  {/* Coins Table */}
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
