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
  const [selectedId, setSelectedId] = useState<number>(0)
  const dispatch = useDispatch<AppDispatch>()
  const coin = useAppSelector(state=>state.changeCurrencyReducer.currency)

  
  
  
  const selectedItem = menulist.find(item=> item.id === selectedId)
 
  
    return(
        <div className="flex flex-col">
            <div onClick={()=>setDropdown(prev=>!prev)} className="p-3 bg-[#EBEBFD] h-full w-[104px] flex items-center justify-between gap-1 mb-2 rounded cursor-pointer">
                {selectedItem ?  selectedItem.icon : menulist[selectedId].icon}
                <span className="text-sm">{selectedItem ?  selectedItem.currency : 'USD'}</span>
                {dropdown ? <IoIosArrowUp/> : <IoIosArrowDown/> }
            </div>
             {dropdown &&
               <ul className="p-3 shadow-lg bg-[#EBEBFD] z-20 rounded">
                  {
                    menulist.map((item)=>{
                      return (
                      <li key={item.id}
                        onClick={()=>{ 
                          dispatch(changeCurrency(item.symbol))
                          dispatch(fetchCoins({currency:item.symbol,page:1}))
                          setDropdown(false)
                          setSelectedId(item.id)
                        }}
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

