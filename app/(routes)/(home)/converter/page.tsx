'use client'

import Image from "next/image"
import { IoArrowForward } from "react-icons/io5";
import verticalSwitch from '@/public/verticalSwitch.png'
import { CategoryScale, ScriptableContext } from 'chart.js';
import { getCurrencySymbol, getCurrentDateTime,  handleUndefinedForChart, handleUndefinedForValue, reformDataLength, searchItems } from '@/app/lib/utilis';
import { SetStateAction, useEffect, useState } from 'react';
import Chart from "chart.js/auto";
import { useAppSelector } from '@/redux/store';
import { FetchedDataProps } from '@/app/lib/type';
import LineChart from '@/app/ui/home/linechart';


Chart.register(CategoryScale)
  

type ChildComponentProps =  {
  selectedId?: string,
  handleSelectedId:React.Dispatch<SetStateAction<string>>,
  value:number | string,
  coin: FetchedDataProps,
  coins:FetchedDataProps[],
  onhandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Converter(){
    const {coins} = useAppSelector((state)=> state.coinstableReducer);

    const [switchcoin, setSwitchCoin] = useState(true)
    const [coinData,setCoinData] = useState<FetchedDataProps[] | []>([])
    const [firstInput, setfirstInput] = useState<number | string>('')
    const [secondInput, setsecondInput] = useState<number | string>('')
    const [firstselectedId, setFirstSelectedId] = useState('bitcoin')
    const [secondselectedId, setSecondSelectedId] = useState('ethereum')
    const firstselectedItem = coinData.find(item=>item.id === firstselectedId) as FetchedDataProps
    const secondselectedItem = coinData.find(item=>item.id === secondselectedId) as FetchedDataProps
      

      useEffect(() => {
        setCoinData(coins)
      }, [coins])
      
      useEffect(() => {
        const factor = firstselectedItem && (firstselectedItem.current_price) / (secondselectedItem && (secondselectedItem.current_price));
        setfirstInput(1)
        setsecondInput(factor && factor.toFixed(2))
      }, [firstselectedItem,secondselectedItem])



      function handleFirstInput(e: React.ChangeEvent<HTMLInputElement>):void{
        const inputValue: string = e.target.value;

        // Check if the input is a valid number (you can add more validation if needed)
        const isValidNumber = /^\d*$/.test(inputValue);
        const factor  = (firstselectedItem.current_price/secondselectedItem.current_price)
        // Update the state if it's a valid number or an empty string
        if (isValidNumber || inputValue === '') {
          setfirstInput(inputValue === '' ? '' : parseInt(inputValue, 10));
          setsecondInput(inputValue === '' ? '' : (parseFloat(inputValue)*factor))
        }
      }

      function handleSecondInput(e: React.ChangeEvent<HTMLInputElement>):void{
        const inputValue:string = e.target.value;
        const isValidNumber = /^\d*$/.test(inputValue)
        const factor  = (secondselectedItem.current_price/firstselectedItem.current_price)
        if(isValidNumber || inputValue===''){
          setsecondInput(inputValue === '' ? '' : parseInt(inputValue,10))
          setfirstInput(inputValue === '' ? '' : (parseFloat(inputValue)*factor))
        }
      }
     
  
  let reformedfirstPrice =firstselectedItem && reformDataLength(firstselectedItem.chartData)
  let reformedSecondPrice =secondselectedItem && reformDataLength(secondselectedItem.chartData)
  


  var prices =  handleUndefinedForChart(reformedfirstPrice,reformedSecondPrice,switchcoin);

  
  var priceChart = {
    labels: Array(prices.length).fill(null).map((i,index)=>++index), 
    datasets: [
      {
        label: "",
        data: prices.map((data) => data),
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(116, 116, 242, 0.8)");
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
          <h1 className=" text-[#424286] dark:text-white text-[20px]">Online currency converter</h1>
          <h3 className=" text-[#424286]/80  dark:text-[#D1D1D1] text-[16px] mb-7">{getCurrentDateTime()}</h3>  

          <div className="flex relative items-center justify-between gap-7 mb-8">

           {switchcoin ?
            <>
                <ConverterCoin 
                 handleSelectedId={setFirstSelectedId} 
                 coins={coinData} 
                 coin={firstselectedItem}  
                 value={firstInput} 
                 onhandleChange = {handleFirstInput}/>

                <ConverterCoin 
                 handleSelectedId={setSecondSelectedId} 
                 coins={coinData} 
                 coin={secondselectedItem}  
                 value={secondInput} 
                 onhandleChange = {handleSecondInput}/>
            </> :
            <>
               <ConverterCoin 
                handleSelectedId={setSecondSelectedId} 
                coins={coinData} 
                coin={secondselectedItem}  
                value={secondInput} 
                onhandleChange = {handleSecondInput}/>

               <ConverterCoin 
                handleSelectedId={setFirstSelectedId} 
                coins={coinData} 
                coin={firstselectedItem}  
                value={firstInput} 
                onhandleChange = {handleFirstInput}/>
            </>
            
            }


            <div onClick={()=>setSwitchCoin(prev=>!prev)} className=' absolute left-1/2 transform -translate-x-1/2 bg-[#6161D6] rounded-full w-12 h-12 flex justify-center items-center cursor-pointer'>
                   <Image 
                    src= {verticalSwitch}
                    alt="exchange"
                    width={24}
                    height={24}
                    
                    />
            </div>

          </div>

          <div className=" w-full flex flex-col justify-center  h-[290px] p-6 bg-white dark:bg-[#191932] mb-4 rounded-md">
            <h1 className=' text-xl flex items-center gap-1'>
              {switchcoin ? handleUndefinedForValue(firstselectedItem?.name)  +'-'+ handleUndefinedForValue(firstselectedItem?.symbol?.toUpperCase()) : handleUndefinedForValue(secondselectedItem?.name)  +'-'+ handleUndefinedForValue(secondselectedItem?.symbol?.toUpperCase())} 
                                <IoArrowForward/> 
              {switchcoin ? handleUndefinedForValue(secondselectedItem?.name) + '-'+ handleUndefinedForValue(secondselectedItem?.symbol?.toUpperCase()) : handleUndefinedForValue(firstselectedItem?.name) +'-'+ handleUndefinedForValue(firstselectedItem?.symbol?.toUpperCase())}
            </h1>
            <LineChart chartData={priceChart} height=' h-full' width=' w-full'/> 
          </div>
        </>
    )
}

function ConverterCoin({coins,handleSelectedId,coin,value,onhandleChange}:ChildComponentProps){
  const [dropdown, setDropDown] = useState(false)
  const currency = useAppSelector(state=>state.changeCurrencyReducer.currency)
  
  return(
    <div className="bg-white dark:bg-[#191932] relative  rounded-2xl p-6   w-1/2">
              <div className='flex justify-between w-full mb-2 items-center'>
                <div onClick={()=>setDropDown(prev=>!prev)} className='flex items-center gap-2 w-1/2 cursor-pointer'>
                    <Image 
                    className=" mr-1"
                    src= {coin?.image || ''}
                    alt="exchange"
                    width={20}
                    height={20}
                    />
                    {/* {coin?.name}({coin?.symbol.toUpperCase()}) */}
                    <div className=' flex   items-center'>

                      <input readOnly  value={(coin?.name || '') +'-'+(coin?.symbol.toUpperCase() || '')}  className=' border-none bg-transparent  cursor-pointer w-[180px] outline-none focus:outline-none'/>
                    </div>
                </div>
                <input placeholder='0' value={value ?? ''} onChange={onhandleChange}  className=' remove-arrow border-none  w-1/2  h-3 bg-transparent outline-none py-3 px-3 focus:outline-none text-right' type="number" />
              </div>
              {dropdown &&
                  <ul className=" p-1 absolute top-18  max-h-[200px] overflow-y-auto w-[200px] shadow-lg bg-white dark:bg-[#191925]">
                    {coins.map(item=>{
                        return (
                            <li 
                            onClick={()=>{
                               
                                setDropDown(false)
                                handleSelectedId(item.id)}}  key={item.id} className=" flex items-center p-2 cursor-pointer hover:bg-[#6161D6]">
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
              <h3 className='py-1 dark:text-[#D1D1D1]'>1 {coin?.symbol.toUpperCase()} = {getCurrencySymbol(currency)}{coin?.current_price}</h3>
    </div>
  )
}