import { useMemo, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Image from "next/image";
import { useAppSelector } from "@/redux/store";
import { searchItems } from "../lib/utilis";
import Link from "next/link";


export default function Input({placeholder}:{placeholder:string}){
    const [dropdown, setDropDown] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const {searchCoins, loading, error} = useAppSelector((state)=> state.searchCoinReducer)
    

    const searchedResult = useMemo(()=>searchItems(searchCoins ?? [],searchInput),[searchCoins,searchInput])
 
    return (
        <div className="relative hidden   lg:flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                value={searchInput}
                onChange={(e)=> setSearchInput(e.target.value)}
                onClick={()=> setDropDown(prev=>!prev)}
                className="outline-none  peer block w-full rounded-md border border-gray-200 dark:border-none py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:placeholder:text-[#D1D1D1] bg-[#CCCCFA66] dark:bg-[#191925]"
                placeholder={placeholder}
            />
            <HiMagnifyingGlass className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-[#D1D1D1] peer-focus:text-gray-900" />
            {dropdown &&
            <ul className=" p-1 absolute z-10 shadow-lg top-12 rounded max-h-[250px] overflow-y-auto w-full bg-white dark:bg-[#191925]">
                {searchedResult.map(item=>{
                if(loading) return <div>Loading...</div>
                if(error) return <div>Error</div>
                return (
                    <Link key={item.id} href={`/coinInfo/${item.name.toLowerCase()}`}>
                        <li onClick={()=>{
                            setDropDown(false)
                            }} className=" flex items-center p-2 cursor-pointer hover:bg-[#6161D6]">
                                <Image 
                                    className=" mr-2 object-contain"
                                    src= {item.image}
                                    alt={item.id}
                                    width={25}
                                    height={25}
                                />
                                {item.name}
                        </li>
                    
                    </Link>
                )
                })}
            </ul>
            }
        </div>
    )
}




