import bitcoin from '@/public/bitcoin.png'
import Image from "next/image"
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri'
import ProgressBar from '../progressbar'
import { FetchedDataProps } from '@/app/lib/type'
import { ScriptableContext } from 'chart.js'
import { reduceData, reformDataLength, getPercentage, getCurrencySymbol, roundValue } from '@/app/lib/utilis'
import  LineChart  from '@/app/ui/home/linechart'
import Currency from '../currency'
import { useState } from 'react'
import { useAppSelector } from '@/redux/store'

export default function Coin({coinData,index}:{coinData:FetchedDataProps,index:number}){
  const currency = useAppSelector(state=>state.changeCurrencyReducer.currency)
      
      var prices =  reformDataLength(coinData.chartData) || []
     
      var priceChart = {
        labels: Array(prices.length).fill(null).map((item,i)=>++i), 
        datasets: [
          {
            data: prices.map((data) => data),
            backgroundColor: (context: ScriptableContext<"line">) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0,25);
              gradient.addColorStop(0, coinData.seven_day > 0 ? "rgba(0, 177, 167, 0.5)":'rgba(254, 34, 100, 0.5)');
              gradient.addColorStop(1, coinData.seven_day > 0 ? "rgba(255, 255, 255, 0.04)":'rgba(255, 255, 255, 0.04)');
              return gradient;
            },
            borderColor: coinData.seven_day > 0 ? 'rgba(0, 177, 167, 1)' : 'rgba(254, 34, 100, 1)',
            borderWidth: 2,
            tension:0.4,
            pointRadius:0,
            fill: 'start',
          }
        ]
      }
    return(
        <ul className=" p-3 xl:p-5 gap-2 w-full rounded-xl   text-[14px] flex items-center bg-white dark:bg-[#191925]">
            <li className=' w-1/12 text-center '>{index}</li>
            <li className='flex  justify-start w-1/3  items-center'>
              <Image 
                className=" mr-2"
                src= {coinData.image}
                alt="flash_circle"
                width={30}
                height={30}
                />
                <span className='sm:text-[16px] flex gap-1 items-center text-[14px]'>
                  {coinData.name}
                  <span className='md:block hidden'>({coinData.symbol.toUpperCase()})</span>
                </span>
            </li>
            <li className='w-1/4 text-center'>{getCurrencySymbol(currency)}<Currency coin={(roundValue(coinData.current_price).toString())}/></li>
            <li className="  md:flex hidden  text-[14px]  items-center justify-center  w-1/5">
                {coinData.one_hour > 0
                ?<RiArrowUpSFill className = 'text-[#00B1A7]' />
                :<RiArrowDownSFill className = ' text-[#FE2264]'/>}
                <span className={coinData.one_hour > 0 
                 ? 'text-[#00B1A7]'
                 : 'text-[#FE2264]'
                }>{Math.abs((coinData.one_hour)).toFixed(1)}%</span>
            </li>
            <li className="  xl:flex hidden  text-[14px] items-center justify-center  w-1/5">
            {coinData.twenty_four > 0
                ?<RiArrowUpSFill className = 'text-[#00B1A7]' />
                :<RiArrowDownSFill className = ' text-[#FE2264]'/>}
                <span className={coinData.twenty_four > 0 
                 ? 'text-[#00B1A7]'
                 : 'text-[#FE2264]'
                }>{Math.abs((coinData.twenty_four)).toFixed(1)}%</span>
            </li>
            <li className=" xl:flex hidden  text-[14px]  items-center justify-center  w-1/5">
            {coinData.seven_day > 0
                ?<RiArrowUpSFill className = 'text-[#00B1A7]' />
                :<RiArrowDownSFill className = ' text-[#FE2264]'/>}
                <span className={coinData.seven_day > 0 
                 ? 'text-[#00B1A7]'
                 : 'text-[#FE2264]'
                }>{Math.abs((coinData.seven_day)).toFixed(1)}%</span>
            </li>
            <li className='sm:block hidden  w-1/2'>
                <div className='flex justify-between'>
                    <p className='text-[12px]'>{getCurrencySymbol(currency)}{(coinData.total_volume / 1e9).toFixed(1)}B</p>
                    <p className='text-[12px]'>{getCurrencySymbol(currency)}{(coinData.market_cap / 1e9).toFixed(1)}B</p>
                </div>
                <div className='h-1 w-full rounded-sm bg-[#7878FA]/50 '>
                   <ProgressBar color=" bg-[#7878FA]" percentage={getPercentage(coinData.total_volume,coinData.market_cap)}/>
                </div>
            </li>
            <li className=' w-1/2 lg:block hidden'>
                <div className='flex justify-between '>
                    <p className='text-[12px]'>{getCurrencySymbol(currency)}{(coinData.circulating_supply / 1e9).toFixed(1)}B</p>
                    <p className='text-[12px]'>{getCurrencySymbol(currency)}{(coinData.total_supply / 1e9).toFixed(1)}B</p>
                </div>
                <div className='h-1 w-full rounded-sm  bg-[#9D62D9]/50'>
                   <ProgressBar color=" bg-[#9D62D9]" percentage={getPercentage(coinData.circulating_supply, coinData.total_supply)}/>
                </div>
            </li>
            <li className=' w-1/3 flex justify-center '>
                <LineChart width=' w-[90px] md:w-[120px]' height=' h-[37px]' chartData={priceChart}/>
            </li>
        </ul>
    )
}