
import Image, { StaticImageData } from "next/image"
import bitcoin from "@/public/bitcoin.png"
import ethereum from '@/public/ethereum.png'
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { SetStateAction, useState } from "react";

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
    onhandleListAssets:(id: string)=> Promise<void>
}

export default function Modal({onModal,onhandleListAssets}:ModalProp){
   const [dropdown, setDropDown] = useState(false)
   const [coinlist,setcoinlist] = useState(coins)
   const [selectedId, setSelectedId] = useState<string | null>(null)

   const selectedItem = coinlist.find(item=>item.id === selectedId);
   
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
                        <input className="bg-[#191925] p-2 outline-none rounded remove-arrow text-white" type="number" />
                        <input className=" bg-[#191925] p-2 outline-none rounded text-white " type="date" />
                        <div className="flex items-center gap-2  justify-between">
                            <button onClick={()=>onModal(false)} className=" w-1/2 text-white bg-[#191925] rounded-md px-[32px] py-[12px]">Cancel</button>
                            <button onClick={()=>{
                                onModal(false)
                                onhandleListAssets(selectedItem ? selectedItem.id : '')
                                }}  className=" w-1/2 text-white bg-[#6161D6] rounded-md px-[20px] py-[12px]">Save and Continue</button>
                        </div>
                        {dropdown &&
                          <ul className=" p-1 absolute top-12 rounded max-h-[300px] overflow-y-auto w-[300px] bg-white">
                             {coinlist.map(item=>{
                                return (
                                    <li onClick={()=>{
                                        setDropDown(false)
                                        setSelectedId(item.id)}}  key={item.id} className=" p-2 cursor-pointer hover:bg-slate-200">{item.name}</li>
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