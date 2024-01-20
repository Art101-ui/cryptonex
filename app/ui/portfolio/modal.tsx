
import Image from "next/image"
import bitcoin from "@/public/bitcoin.png"
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { SetStateAction } from "react";

export default function Modal({onModal}:{onModal:React.Dispatch<SetStateAction<boolean>>}){
    return(
        <div className="  ">
            <div className=" bg-[#13121A]  w-[700px] rounded-[20px] p-12">
                    <div className=" mb-3 flex items-center justify-between">
                        <p className="text-white">Select coins</p>
                        <MdOutlineCancel onClick={()=>onModal(false)} className = ' text-white cursor-pointer'/>
                    </div>
                    <div className="flex h-full gap-2">
                    <div className=" w-1/3 flex flex-col items-center justify-center p-4 rounded-md  bg-[#191932]">
                        <Image 
                            className=" mb-4"
                            src= {bitcoin}
                            alt="exchange"
                            width={32}
                            height={32}
                        />
                            <h1 className="text-white">Bitcoin (BTC)</h1>
                    </div>
                    <div className="w-2/3 flex flex-col gap-4 justify-between">
                        <div className=" bg-[#191925] p-2 text-white  rounded flex justify-between items-center">Select coin <IoMdArrowDropdown/></div>
                        <input className="bg-[#191925] p-2 outline-none rounded remove-arrow text-white" type="number" />
                        <input className=" bg-[#191925] p-2 outline-none rounded text-white " type="date" />
                        <div className="flex items-center gap-2  justify-between">
                            <button onClick={()=>onModal(false)} className=" w-1/2 text-white bg-[#191925] rounded-md px-[32px] py-[12px]">Cancel</button>
                            <button  className=" w-1/2 text-white bg-[#6161D6] rounded-md px-[20px] py-[12px]">Save and Continue</button>
                        </div>
                    </div>
                    </div>
            </div>     
            </div>
    )
}