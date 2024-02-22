'use client'

import bitcoin from '@/public/bitcoin.png'
import Image from "next/image"
import { RiArrowUpSFill } from "react-icons/ri";
import verticalSwitch from '@/public/verticalSwitch.png'
import { CategoryScale, ScriptableContext } from 'chart.js';
import { getDayNumber, reduceData, reformDataLength, searchItems } from '@/app/lib/utilis';
import { SetStateAction, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import PriceChart from '@/app/ui/home/pricechart';
import clsx from 'clsx';
import Chart from "chart.js/auto";
import { input } from '@material-tailwind/react';
import { useAppSelector } from '@/redux/store';
import { FetchedDataProps } from '@/app/lib/type';
import LineChart from '@/app/ui/home/linechart';


Chart.register(CategoryScale)
// type FetchedDataProps={
//     prices:[],
//     market_caps:[],
//     total_volumes:[]
//   }

type RequestStateProps =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: any }
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

type ChildComponentProps =  {
  selectedId?: string,
  handleSelectedId:React.Dispatch<SetStateAction<string>>,
  value:number | string,
  coin: FetchedDataProps,
  coins:FetchedDataProps[],
  onhandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Converter(){

    const [switchcoin, setSwitchCoin] = useState(true)
    const [coinData,setCoinData] = useState<FetchedDataProps[] | []>([])
    const [firstInput, setfirstInput] = useState<number | string>('')
    const [secondInput, setsecondInput] = useState<number | string>('')
      

      const {coins} = useAppSelector((state)=> state.coinstableReducer);
      useEffect(() => {
        setCoinData(coins)
      }, [coins])
      

      const [firstselectedId, setFirstSelectedId] = useState('bitcoin')
      const [secondselectedId, setSecondSelectedId] = useState('ethereum')
      const firstselectedItem = coinData.find(item=>item.id === firstselectedId) as FetchedDataProps
      const secondselectedItem = coinData.find(item=>item.id === secondselectedId) as FetchedDataProps


      function handleFirstInput(e: React.ChangeEvent<HTMLInputElement>):void{
        const inputValue: string = e.target.value;

        // Check if the input is a valid number (you can add more validation if needed)
        const isValidNumber = /^\d*$/.test(inputValue);
        const factor  = (firstselectedItem.current_price/secondselectedItem.current_price)
        // Update the state if it's a valid number or an empty string
        if (isValidNumber || inputValue === '') {
          setfirstInput(inputValue === '' ? '' : parseInt(inputValue, 10));
          setsecondInput(inputValue === '' ? '' : (parseFloat(inputValue)*factor).toFixed(2))
        }
      }
      
      useEffect(() => {
        const factor = firstselectedItem && (firstselectedItem.current_price) / (secondselectedItem && (secondselectedItem.current_price));
        setfirstInput(1)
        setsecondInput(factor && factor.toFixed(2))
      }, [firstselectedItem,secondselectedItem])
      



      function handleSecondInput(e: React.ChangeEvent<HTMLInputElement>):void{
        const inputValue:string = e.target.value;
        const isValidNumber = /^\d*$/.test(inputValue)
        const factor  = (secondselectedItem.current_price/firstselectedItem.current_price)
        if(isValidNumber || inputValue===''){
          setsecondInput(inputValue === '' ? '' : parseInt(inputValue,10))
          setfirstInput(inputValue === '' ? '' : (parseFloat(inputValue)*factor).toFixed(2))
        }
      }
      
 
      
 

  function checkForUndefined(firstPrice:[],secondPrice:[]){
    let prices: number[]= [];
    if (firstPrice && secondPrice && firstPrice.length === secondPrice.length) {
      if(switchcoin){
        prices = firstPrice.map((item, index) => {
               return item / secondPrice[index];          
       });
      }else{
        prices = secondPrice.map((item, index) => {
          return item / firstPrice[index];          
  });
      }
    } else {
        // Handle case where arrays are undefined or have different lengths
        console.error('Arrays are undefined or have different lengths.');
    }
    return prices;
  }

  
  let reformedfirstPrice =firstselectedItem && reformDataLength(firstselectedItem.chartData)
  let reformedSecondPrice =secondselectedItem && reformDataLength(secondselectedItem.chartData)
  


  var prices =  checkForUndefined(reformedfirstPrice,reformedSecondPrice);

  
  var priceChart = {
    labels: Array(prices.length).fill(null).map((i,index)=>++index), 
    datasets: [
      {
        label: "",
        data: prices.map((data) => data),
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

    return(
        <>
          <h1 className=" text-[#424286] text-[20px]">Online currency converter</h1>
          <h3 className=" text-[#424286]/80 text-[16px] mb-7">09/29/2023 14:15</h3>  

          <div className="flex relative items-center justify-between gap-7 mb-8">

           {switchcoin ?
            <>
                <ConverterCoin handleSelectedId={setFirstSelectedId} coins={coinData} coin={firstselectedItem}  value={firstInput} onhandleChange = {handleFirstInput}/>
                <ConverterCoin handleSelectedId={setSecondSelectedId} coins={coinData} coin={secondselectedItem}  value={secondInput} onhandleChange = {handleSecondInput}/>
            </> :
            <>
               <ConverterCoin handleSelectedId={setSecondSelectedId} coins={coinData} coin={secondselectedItem}  value={secondInput} onhandleChange = {handleSecondInput}/>
               <ConverterCoin handleSelectedId={setFirstSelectedId} coins={coinData} coin={firstselectedItem}  value={firstInput} onhandleChange = {handleFirstInput}/>
            </>
            
            }


            <div onClick={()=>setSwitchCoin(prev=>!prev)} className=' absolute left-1/2 transform -translate-x-1/2 bg-[#353570] rounded-full w-12 h-12 flex justify-center items-center cursor-pointer'>
                   <Image 
                    src= {verticalSwitch}
                    alt="exchange"
                    width={24}
                    height={24}
                    />
            </div>

          </div>

          <div className=" w-full flex flex-col justify-center  h-[290px] p-6 bg-white mb-4 rounded-md">
            <h1 className=' text-xl'>{firstselectedItem?.name +' - '+ firstselectedItem?.symbol?.toUpperCase()} to {secondselectedItem?.name +' - '+ secondselectedItem?.symbol?.toUpperCase()}</h1>
            <LineChart chartData={priceChart} height=' h-full' width=' w-full'/> 
          </div>
        </>
    )
}

function ConverterCoin({coins,handleSelectedId,coin,value,onhandleChange}:ChildComponentProps){
  const [dropdown, setDropDown] = useState(false)

  
  return(
    <div className="bg-white relative  rounded-2xl p-6   w-1/2">
              <div className='flex justify-between w-full items-center'>
                <div onClick={()=>setDropDown(prev=>!prev)} className='flex items-center gap-2 w-1/2 cursor-pointer'>
                    <Image 
                    className=" mr-1"
                    src= {coin?.image || ''}
                    alt="exchange"
                    width={20}
                    height={20}
                    />
                    {/* {coin?.name}({coin?.symbol.toUpperCase()}) */}
                    <div className=' flex bg-slate-600  items-center'>

                      <input readOnly  value={(coin?.name || '') +'-'+(coin?.symbol.toUpperCase() || '')}  className=' border-none  cursor-pointer w-[180px] outline-none focus:outline-none'/>
                    </div>
                </div>
                <input placeholder='0' value={value ?? ''} onChange={onhandleChange}  className=' remove-arrow border-none  w-1/2  h-3 bg-transparent outline-none py-3 px-3 focus:outline-none text-right' type="number" />
              </div>
              {dropdown &&
                  <ul className=" p-1 absolute top-18 rounded max-h-[200px] overflow-y-auto w-[200px] shadow-lg bg-white">
                    {coins.map(item=>{
                        return (
                            <li 
                            onClick={()=>{
                               
                                setDropDown(false)
                                handleSelectedId(item.id)}}  key={item.id} className=" flex items-center p-2 cursor-pointer hover:bg-slate-200">
                                <Image 
                                    className=" mr-2 object-contain"
                                    src= {item.image}
                                    alt={item.id}
                                    width={25}
                                    height={25}
                                /> 
                                {item.name}
                            </li>
                        )
                    })}
                  </ul>
                }
              <hr />
              <h3 className='py-1'>1 {coin?.symbol.toUpperCase()} = ${coin?.current_price}</h3>
    </div>
  )
}