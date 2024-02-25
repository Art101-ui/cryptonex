
import Image, { StaticImageData } from "next/image"
import bitcoin from "@/public/bitcoin.png"
import ethereum from '@/public/ethereum.png'
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { SetStateAction, useMemo, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { searchItems } from "@/app/lib/utilis";


const coins = [
    {id:'bitcoin', name:'Bitcoin',image:bitcoin},
    {id:'ethereum', name:'Ethereum',image:ethereum},
    {id:'usd-coin', name:'USD',image:bitcoin},
    {id:'tether', name:'Tether',image:ethereum},    
]

type CoinProp={
    id:string,
    name:string,
    image:StaticImageData
}

type ModalProp={
    onModal: React.Dispatch<SetStateAction<boolean>>,
    onhandleListAssets:(id: string, amount:string, date:string)=> void
}

export default function Modal({onModal,onhandleListAssets}:ModalProp){
   const [dropdown, setDropDown] = useState(false)
   const [coinInput,setcoinInput] = useState('')
   const [amount,setAmount] = useState('');
   const [date, setDate] = useState('');
   const [selectedId, setSelectedId] = useState<string | null>(null)
   const {searchCoins, loading, error} = useAppSelector((state)=> state.searchCoinReducer)

   const selectedItem = searchCoins.find(item=>item.id === selectedId);
   
   const searchedResult = useMemo(()=>searchItems(searchCoins ?? [],coinInput),[searchCoins,coinInput])

    return(
        <div className="  ">
            <div className=" bg-[#13121A]  w-[700px] rounded-[20px] p-12">
                    <div className=" mb-3 flex items-center justify-between">
                        <p className="text-white">Select coins</p>
                        <MdOutlineCancel onClick={()=>onModal(false)} className = ' text-white cursor-pointer'/>
                    </div>
                    <div className="flex h-full gap-2">
                    <div className=" w-1/3 flex flex-col items-center justify-center p-4 rounded-md  bg-[#191932]">
                        {selectedId ? 
                        <>
                            <Image 
                                className=" mb-4"
                                src= {selectedItem ? selectedItem.image : ''}
                                alt="exchange"
                                width={32}
                                height={32}
                            />
                                <h1 className="text-white">{selectedItem ? selectedItem.name : ''}</h1>
                        </>
                        : <h1>No coins selected</h1>
                        }
                    </div>
                    <div className="w-2/3 relative flex flex-col gap-4 justify-between">
                        <div onClick={()=>setDropDown(prev=>!prev)} className=" bg-[#191925] p-2 cursor-pointer text-white  rounded flex justify-between items-center">
                        {selectedItem ? selectedItem.name : 'Select coin'}
                            <IoMdArrowDropdown/>        
                        </div>
                        <input value={amount} onChange={(e)=>setAmount(e.target.value)} className="bg-[#191925] p-2 outline-none rounded remove-arrow text-white" type="number" />
                        <input value={date} onChange={(e)=>setDate(e.target.value)} className=" bg-[#191925] p-2 outline-none rounded text-white " type="date" />
                        <div className="flex items-center gap-2  justify-between">
                            <button onClick={()=>onModal(false)} className=" w-1/2 text-white bg-[#191925] rounded-md px-[32px] py-[12px]">Cancel</button>
                            
                            <button 
                                disabled={selectedItem?.name===null || amount==='' || date===''}
                                onClick={()=>{
                                    onModal(false)
                                    onhandleListAssets(selectedItem ? selectedItem.id : '',amount,date)
                                }}  className=" disabled:bg-[#6161D6]/30 disabled:text-white/30 w-1/2 text-white bg-[#6161D6] rounded-md px-[20px] py-[12px]">Save and Continue</button>
                        </div>
                        {dropdown &&
                          <ul className=" p-1 absolute top-12 rounded max-h-[300px] overflow-y-auto w-[300px] bg-white dark:bg-[#191925]">
                             {searchedResult.map(item=>{
                                return (
                                    <li onClick={()=>{
                                        setDropDown(false)
                                        setSelectedId(item.id)}}  key={item.id} className=" flex items-center p-2 cursor-pointer hover:bg-[#6161D6]">
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

                    </div>
                    </div>
            </div>     
            </div>
    )
}