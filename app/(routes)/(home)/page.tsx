'use client'
import { LuBarChart3 } from "react-icons/lu";

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper-bundle.css";
import 'swiper/css/navigation';
import '@/app/ui/home/mySwiper.css'
import { Navigation } from 'swiper/modules';

import CoinBox from "@/app/ui/home/coinbox";
import { useRef } from "react";

const coinlist=[
  {id:0, coin:'Bitcoin (BTC)'},
  {id:1, coin:'Ethereum (ETH)'},
  {id:2, coin:'Tether (USDT)'},
  {id:3, coin:'Doge Coin (DGC)'},
  {id:4, coin:'Doge Coin (DGC)'},
  {id:5, coin:'Doge Coin (DGC)'},
  {id:6, coin:'Doge Coin (DGC)'},
  {id:7, coin:'Doge Coin (DGC)'},
  // {id:8, coin:'Doge Coin (DGC)'},
  // {id:9, coin:'Doge Coin (DGC)'},
  // {id:10, coin:'Doge Coin (DGC)'},
]

export default function Home() {

  return (
    <div>
      <main>
        <div className="flex justify-between items-center mb-6">
          <p>Select the currency to view statistics</p>
          <button className=" bg-white rounded py-2 px-3 flex items-center justify-center">
            <LuBarChart3 className = 'mr-2'/>
            Compare</button>
        </div>

      <div className="relative">
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

        
      </main>
    </div>
  )
}
