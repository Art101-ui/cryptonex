import { useMemo, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Image from "next/image";
import { searchItems } from "../lib/utilis";
import Link from "next/link";

type CoinListProp ={
    id: string;
    name:string,
    image:string,  
}

export default function Input({placeholder,isLoading,coins}:{placeholder:string,isLoading:boolean,coins:CoinListProp[]}){
    const [dropdown, setDropdown] = useState(false)
    const [search, setSearch] = useState('')

    const searchedItems = useMemo(()=> searchItems(coins,search),[coins,search])

    return (
        <div className="flex relative flex-col ">
            <div onClick={()=>setDropdown(!dropdown)} className=" relative flex flex-1 flex-shrink-0 mb-2">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input
                    value={search}
                    onChange={(e)=>{setSearch(e.target.value)}}
                    className="outline-none peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 bg-[#CCCCFA66]"
                    placeholder={placeholder}
                />
                <HiMagnifyingGlass className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {search &&
               <ul className=" top-[47px] absolute p-3 bg-white z-20 rounded w-full overflow-y-auto h-[220px] border border-[#d3d3d3]">
                  {
                    searchedItems.map((item,index,arr)=>{
                      return (
                      <Link key={item.id} className=" mb-1" href={`/coinInfo/${item.id.toLowerCase()}`} >
                          <li className="flex items-center mb-2 gap-2 ">
                             <Image 
                                src= {item.image}
                                alt="logo"
                                width={30}
                                height={30}
                                />
                             <span>{item.name}</span>
                          </li>
                          {index < arr.length-1 && <hr className=" bg-[#333]"/>}
                       </Link>  
                      )
                    })
                  }
               </ul>
             }
        </div>
    )
}