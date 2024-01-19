
import Image from "next/image"
import bitcoin from "@/public/bitcoin.png"

export default function Modal(){
    return(
        <div className="  ">
                <div className=" bg-[#13121A] h-[350px] w-[700px] rounded-[20px] p-12">
                     <div className="flex justify-between">
                        <p>Select coins</p>
                        <p>Close</p>
                     </div>
                     <div className="flex h-full gap-2">
                        <div className=" w-1/3 flex flex-col items-center justify-center p-4  bg-[#191932]">
                            <Image 
                                className=" mr-1"
                                src= {bitcoin}
                                alt="exchange"
                                width={32}
                                height={32}
                            />
                             <h1>Bitcoin (BTC)</h1>
                        </div>
                        <div className="w-2/3">
                            <div>Select coin</div>
                            <input type=" remove-arrow number" />
                            <input type="date" />
                            <div className="flex justify-between">
                                <button>Cancel</button>
                                <button>Save and Continue</button>
                            </div>
                        </div>
                     </div>
                </div>     
            </div>
    )
}