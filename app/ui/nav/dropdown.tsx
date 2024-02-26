"use client"

import { useState } from "react"
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";
import { PiCurrencyDollarSimpleFill } from "react-icons/pi";
import { MdEuro } from "react-icons/md";
import { PiCurrencyGbp } from "react-icons/pi";
import { changeCurrency } from "@/redux/features/changeCurrency-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { fetchCoins } from "@/redux/features/coinstable-slice";
import { fetchSearchCoins } from "@/redux/features/searchCoin-slice";



type MenuList ={
    id:number,
    currency:string,
    symbol:string,
    icon: any
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

  
  
  
  const selectedItem = menulist.find(item=> item.id === selectedId)
 
  
    return(
        <div className="flex flex-col">
            <div onClick={(e)=>{
              e.stopPropagation()
              setDropdown(prev=>!prev)}} className="p-3 bg-[#EBEBFD] dark:bg-[#191925] h-full w-[104px] flex items-center justify-between gap-1 mb-2 rounded cursor-pointer">
                {selectedItem ?  selectedItem.icon : menulist[selectedId].icon}
                <span className="text-sm">{selectedItem ?  selectedItem.currency : 'USD'}</span>
                {dropdown ? <IoIosArrowUp/> : <IoIosArrowDown/> }
            </div>
             {dropdown &&
               <ul className=" shadow-lg bg-[#EBEBFD] dark:bg-[#191925] z-20 rounded">
                  {
                    menulist.map((item)=>{
                      return (
                      <li key={item.id}
                        onClick={()=>{ 
                          dispatch(changeCurrency(item.symbol))
                          dispatch(fetchSearchCoins(item.symbol))
                          dispatch(fetchCoins({currency:item.symbol,page:1}))
                          setDropdown(false)
                          setSelectedId(item.id)
                        }}
                          className="flex items-center gap-2 p-1 px-3 hover:bg-[#6161D6] hover:text-white cursor-pointer ">
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

