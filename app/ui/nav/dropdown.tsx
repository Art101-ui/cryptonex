"use client"

import { useState } from "react"
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";
import { PiCurrencyDollarSimpleFill } from "react-icons/pi";
import { MdEuro } from "react-icons/md";
import { PiCurrencyNgn } from "react-icons/pi";
import { PiCurrencyGbp } from "react-icons/pi";

type MenuList ={
    id:number,
    currency:string,
    icon: any
}
const menulist=[
    {id:0, currency:'USD', icon: <PiCurrencyDollarSimpleFill/>},
    {id:1, currency:'EUR', icon: <MdEuro/>},
    {id:2, currency:'NGN', icon: <PiCurrencyNgn/>},
    {id:3, currency:'GBP', icon: <PiCurrencyGbp/>},
]

export default function DropDown(){
    const [dropdown, setDropdown] = useState(false)
    return(
        <div className="flex flex-col">
            <div onClick={()=>setDropdown(prev=>!prev)} className="p-3 bg-[#CCCCFA66] h-full w-[104px] flex items-center gap-1 mb-2 rounded">
                <PiCurrencyDollarSimpleFill/>
                <span className="text-sm">USD</span>
                {dropdown ? <IoIosArrowUp/> : <IoIosArrowDown/> }
            </div>
             {dropdown &&
               <ul className="p-3 bg-[#CCCCFA66] rounded">
                  {
                    menulist.map((item)=>{
                      return (
                      <li key={item.id} className="flex items-center gap-1 ">
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

