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
import { FetchedDataProps } from "@/app/lib/type";
import { AppDispatch, useAppSelector } from "@/redux/store";
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
  const {coins} = useAppSelector((state)=> state.coinstableReducer);
  const {chartCoins,selectedCoins} = useAppSelector((state)=> state.mainCoinChartReducer);
  const dispatch = useDispatch<AppDispatch>()

 const [requestData,setRequestedData] = useState<RequestDataProps[]>([])
 const [timeline,setTimeline] = useState<number | string>(1)

 const [selectedIds,setSelectedIds] = useState<string[]>([])
  
 const [data,setData] = useState<FetchedDataProps[]>([]);

 


 useEffect(() => {
   setData(coins)
 }, [coins])
 
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


  return (
    <div>
      <main className=" mb-10">
        <div className="flex justify-between items-center mb-6 gap-3">
          <p className=" dark:text-[#D1D1D1] text-[14px] sm:text-[16px]">Select the currency to view statistics</p>
          <button className=" bg-white dark:bg-[#232336] rounded py-2 px-3 flex items-center justify-center">
            <LuBarChart3 className = 'mr-2'/>
            Compare</button>
        </div>

        {/* Swiper */}
          <div className="relative mb-8  ">
              <Swiper
                  breakpoints={{
                    300: { slidesPerView: 3, spaceBetween: 30 },
                    480: { slidesPerView: 4, spaceBetween: 30 },
                    540: { slidesPerView: 5, spaceBetween: 30 },
                    768: { slidesPerView: 3, spaceBetween: 50 },
                    900: { slidesPerView: 4, spaceBetween: 50 },
                    1300: { slidesPerView: 5, spaceBetween: 150 },
                  }}   
                  slidesPerView={5}
                  spaceBetween={50}  
                  navigation={true}
                  modules={[Navigation]}
                  className=" flex gap-5"
                  style={{marginRight:'18px',marginLeft:'18px',position: 'unset'}}
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

        <div className=" md:flex items-center mb-6 gap-8 justify-between">
          <div className=" w-full md:w-1/2 mb-8 md:mb-0 h-[300px] md:h-[380px] p-3 md:p-5 bg-white dark:bg-[#191932] rounded-md">
            <PriceChart selectedIds={selectedIds}  showHeading={true} chartData={requestData}/>
          </div>
          <div className=" w-full md:w-1/2 h-[300px] md:h-[380px] p-3 md:p-5 bg-white dark:bg-[#191932] rounded-md">
            <VolumeChart  chartData={requestData}/>
          </div>
        </div>


        <div className=" bg-[#CCCCFA] dark:bg-[#232336] h-[42px] w-full md:w-[490px] p-[2px]  gap-2 rounded-md flex">
          {timelineData.map((item,index)=>{
            return(
              <div key={item.id} className={clsx(
                "  text-[14px] grow flex items-center justify-center rounded-md cursor-pointer ",
                {'bg-[#6161D6]/50 dark:text-[#E4E4F0]' : timeline === item.days},
                {'dark:text-[#A7A7CC] font-light' : timeline !== item.days},
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
