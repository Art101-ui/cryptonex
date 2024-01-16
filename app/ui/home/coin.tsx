import bitcoin from '@/public/bitcoin.png'
import Image from "next/image"
import { RiArrowUpSFill } from 'react-icons/ri'
import ProgressBar from '../progressbar'
import { FetchedDataProps } from '@/app/lib/type'
import { ScriptableContext } from 'chart.js'
import { reduceData, getDayNumber } from '@/app/lib/utilis'
import  LineChart  from '@/app/ui/home/linechart'

export default function Coin({coinData,index}:{coinData:FetchedDataProps,index:number}){
    function reformDataLength(listOfArray:[]){
        let newArr:[]=[]
        if(listOfArray.length > 100 && listOfArray.length < 750){
          newArr = reduceData(listOfArray,5)
        }
        return newArr
      }
      
      var prices =  reformDataLength(coinData.chartData) || []
     
    //   Array(prices.length).fill(null).map((item,i)=>++i)
      var priceChart = {
        labels: Array(prices.length).fill(null).map((item,i)=>++i), 
        datasets: [
          {
            data: prices.map((data) => data),
            backgroundColor: (context: ScriptableContext<"line">) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 38);
              gradient.addColorStop(0, "rgba(0, 177, 167, 0.8)");
              gradient.addColorStop(1, "rgba(255, 255, 255, 0.3)");
              return gradient;
            },
            borderColor: 'rgba(0, 177, 167, 1)',
            borderWidth: 2,
            tension:0.8,
            pointRadius:0,
            fill: 'start',
          }
        ]
      }
    return(
        <ul className=" p-5 gap-2 w-full rounded-xl   text-[14px] flex items-center bg-white">
            <li className=' w-1/12 text-center '>{index}</li>
            <li className='flex  justify-start w-1/3  items-center'>
              <Image 
                className=" mr-2 object-contain"
                src= {coinData.image}
                alt="flash_circle"
                width={30}
                height={30}
                />
                <span>{coinData.name}({coinData.symbol.toUpperCase()})</span>
            </li>
            <li className='w-1/4 text-center'>${coinData.current_price}</li>
            <li className="  text-[14px] flex items-center justify-center  w-1/5">
                <RiArrowUpSFill className = 'text-[#01F1E3]' />
                <span className="">{(coinData.one_hour).toFixed(1)}%</span>
            </li>
            <li className="  text-[14px] flex items-center justify-center  w-1/5">
                <RiArrowUpSFill className = 'text-[#01F1E3]' />
                <span className="">{(coinData.twenty_four).toFixed(1)}%</span>
            </li>
            <li className="  text-[14px] flex items-center justify-center  w-1/5">
                <RiArrowUpSFill className = 'text-[#01F1E3]' />
                <span className="">{(coinData.seven_day).toFixed(1)}%</span>
            </li>
            <li className=' w-1/2'>
                <div className='flex justify-between'>
                    <p className='text-[12px]'>${(coinData.total_volume / 1e9).toFixed(1)}B</p>
                    <p className='text-[12px]'>${(coinData.market_cap / 1e9).toFixed(1)}B</p>
                </div>
                <div className='h-1 w-full rounded-sm  bg-gray-300'>
                   <ProgressBar color=" bg-[#00B1A7]" percentage={25}/>
                </div>
            </li>
            <li className=' w-1/2 '>
                <div className='flex justify-between'>
                    <p className='text-[12px]'>${(coinData.circulating_supply / 1e9).toFixed(1)}B</p>
                    <p className='text-[12px]'>${(coinData.total_supply / 1e9).toFixed(1)}B</p>
                </div>
                <div className='h-1 w-full rounded-sm  bg-gray-300'>
                   <ProgressBar color=" bg-[#00B1A7]" percentage={25}/>
                </div>
            </li>
            <li className=' w-1/3 flex justify-center '>
                <LineChart chartData={priceChart}/>
            </li>
        </ul>
    )
}