'use client'
import Image from "next/image"
import bitcoin from '@/public/bitcoin.png'
import { RiArrowUpSFill } from "react-icons/ri"
import ProgressBar from "@/app/ui/progressbar"
import { useState } from "react"
import Modal from "@/app/ui/portfolio/modal"

export default function Portfolio(){
    const [modal,setModal] = useState(false)
    return (
        <div className="">
            {modal && 
              <div onClick={()=>setModal(false)} className="  absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[#262437]/30 backdrop-blur-sm">
                <div onClick={(e)=>{
                    e.stopPropagation()
                }}>
                    <Modal/>
                </div>
              </div>
            }
            <div className="px-[70px]  py-5 ">
                <div className="flex items-center justify-between mb-6">
                <h1 className=" text-[24px]">Portfolio</h1> 
                <button onClick={()=>setModal(prev=>!prev)} className=" flex bg-[#6161D6] text-white justify-center w-[250px] h-[45px] cursor-pointer font-bold py-3 px-4 rounded-md">Add Asset</button>
                </div>
                <div className="flex w-full">
                <div className="bg-[#7878FA] rounded-l-lg w-1/3 p-4">
                    <div className='flex items-center gap-1 mb-5'>
                        <Image 
                        className=" mr-1"
                        src= {bitcoin}
                        alt="exchange"
                        width={32}
                        height={32}
                        />
                        <p className=' text-[24px]'>Bitcoin(BTC)</p>
                    </div>
                    <h3 className=" text-[16px] mb-1">Total Value</h3>
                    <div className=" flex">
                        <span className=" mr-2 text-[28px]">$29,850 USD</span> 
                        <span className="flex items-center text-[16px] text-[#01F1E3]"><RiArrowUpSFill/> 6.76%</span>
                    </div>
                    <p className=" text-[14px]">Purchased 03.23.2023</p>
                </div>
                <div className=" flex w-2/3 px-4 py-6 bg-white gap-2 rounded-r-lg">
                    <div className=" w-1/2 flex flex-col gap-2">
                        <div className=" rounded-lg border border-[#2D2D51] px-[10px] py-3">
                        <h1 className=" text-[20px]">$29,850</h1> 
                        <p className=" text-[14px]">Current price</p>
                        </div>
                        <div className=" rounded-lg border border-[#2D2D51] px-[10px] py-3">
                            <div className="flex items-center gap-2 text-[20px] text-[#01F1E3]">
                                44%
                                <div className='h-[6px] rounded-sm w-full  bg-[#01F1E3]/50'>
                                    <ProgressBar percentage={44} color=" bg-[#01F1E3]"/>
                                </div>
                            </div>
                            <p className="  text-[14px]">Market cap vs volume</p>
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col gap-2">
                        <div className=" rounded-lg border border-[#2D2D51] px-[10px] py-3">
                        <span className="flex items-center text-[20px] text-[#01F1E3]"><RiArrowUpSFill/> 6.76%</span> 
                        <p className=" text-[14px]">24h%</p>
                        </div>
                        <div className=" rounded-lg border border-[#2D2D51] px-[10px] py-3">
                            <span className="flex items-center text-[20px] text-[#01F1E3]"><RiArrowUpSFill/> 6.76%</span> 
                            <p className=" text-[14px]">Circ supply vs max supply</p>
                        </div>         
                    </div>
                </div>
                </div>
            </div>
            
        </div>
    )
}