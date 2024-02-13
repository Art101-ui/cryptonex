"use client"

import { useEffect, useState } from "react"
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";
import { PiCurrencyDollarSimpleFill } from "react-icons/pi";
import { MdEuro } from "react-icons/md";
import { PiCurrencyGbp } from "react-icons/pi";
import { changeCurrency } from "@/redux/features/changeCurrency-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, store, useAppSelector } from "@/redux/store";
import coinstableSlice, { fetchCoins,changePrice } from "@/redux/features/coinstable-slice";
import axios from "axios";



type MenuList ={
    id:number,
    currency:string,
    symbol:string,
    icon: any
}

type CurrencyData ={
    currency:string,
    value:number,
    symbol?:string,
    icon?: any
}

const menulist: MenuList[]=[
    {id:0, currency:'USD', symbol:'usd', icon: <PiCurrencyDollarSimpleFill/>},
    {id:1, currency:'EUR', symbol:'eur', icon: <MdEuro/>},
    {id:2, currency:'GBP', symbol:'gbp', icon: <PiCurrencyGbp/>},
];




export default function DropDown(){
  const [dropdown, setDropdown] = useState(false)
  const [selectedId, setSelectedId] = useState<string>('')
  const [requestData,setRequestData] = useState<CurrencyData[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const coin = useAppSelector(state=>state.changeCurrencyReducer.currency)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    async function getExchangeRate() {
      try {
        const response = await axios.get(`https://api.currencyapi.com/v3/latest?currencies=EUR,USD,GBP&apikey=${process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY}`,{signal})
        const newData = Object.keys(response.data.data).map(
          (item)=>{
           return {currency:item,symbol:item.toLowerCase(),value:response.data.data[item].value}
          }
        
        )
        setRequestData(newData);
        
      } catch (error) {
        console.log(error)
      }
  
    }

    getExchangeRate()
  
    return ()=> abortController.abort()
  }, [])
  
  
  
  const selectedItem = requestData.find(item=> item.currency === selectedId)
  console.log(selectedItem)
  
    return(
        <div className="flex flex-col">
            <div onClick={()=>setDropdown(prev=>!prev)} className="p-3 bg-[#EBEBFD] h-full w-[104px] flex items-center justify-between gap-1 mb-2 rounded cursor-pointer">
                {/* {selectedItem ?  selectedItem.icon : requestData[selectedId].icon} */}
                <span className="text-sm">{selectedItem ?  selectedItem.currency : 'USD'}</span>
                {dropdown ? <IoIosArrowUp/> : <IoIosArrowDown/> }
            </div>
             {dropdown &&
               <ul className="p-3 shadow-lg bg-[#EBEBFD] z-20 rounded">
                  {
                    requestData.map((item)=>{
                      return (
                      <li key={item.currency}
                        onClick={()=>{ 
                          dispatch(changeCurrency(item.symbol))
                          dispatch(fetchCoins({currency:item.symbol,page:1}))
                          setDropdown(false)
                          setSelectedId(item.currency)}}
                          className="flex items-center gap-1 hover:text-yellow-50 cursor-pointer ">
                          {item.icon}
                          <span>{item.currency}</span>
                      </li>)
                    })
                  }
               </ul>
             } 
        </div>
    )
}

