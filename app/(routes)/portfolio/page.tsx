'use client'

import { useState, useEffect } from "react"
import Modal from "@/app/ui/portfolio/modal"
import axios from "axios"
import { StatusProps, AssetsProp } from "@/app/lib/type"
import CoinAsset from "@/app/ui/portfolio/coinasset"



export default function Portfolio(){
    
    const [modal,setModal] = useState(false)
    const [status, setStatus] = useState<StatusProps>('idle')
    const [listofAssets, setListOfAssets] = useState<AssetsProp[]>([]);
    

    

    async function getHistoryData(id:string) {
        try {
          setStatus('loading')
          const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/history?date=03-01-2024`)
          setListOfAssets(prev=>
            [...prev,  
            {
              id:response.data.id,
              name:response.data.name,
              symbol:response.data.symbol,
              image: response.data.image.thumb,
              price: response.data.market_data.current_price.usd,
              market_cap:response.data.market_data.market_cap.usd,
              total_volume:response.data.market_data.total_volume.usd,
              circ_supply: 20,
              max_supply:80,
              twenty_four:79,
              date:'3/23/2023',
              purchased:9,
            }
            ]
            ) 
            setStatus('success')
        } catch (error) {
            console.log(error)
            setStatus('error')
        }
        
    }

    async function handleAddAssets(id:string){
       await getHistoryData(id)
    }

    return (
        <div>
            {modal && 
              <div onClick={()=>setModal(false)} className="  absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[#262437]/30 backdrop-blur-sm">
                <div onClick={(e)=>{
                    e.stopPropagation()
                }}>
                    <Modal onhandleListAssets={handleAddAssets} onModal={setModal}/>
                </div>
              </div>
            }
            <div className="px-[70px]  py-5 ">
                <div className="flex items-center justify-between mb-6">
                <h1 className=" text-[24px]">Portfolio</h1> 
                <button onClick={()=>setModal(prev=>!prev)} className=" flex bg-[#6161D6] text-white justify-center w-[250px] h-[45px] cursor-pointer font-bold py-3 px-4 rounded-md">Add Asset</button>
                </div>
                {status === 'error' && <div className=" text-center">Error : Try again</div> }
                {status === 'loading' && <h1 className=" text-center">Loading...</h1>}
                {status === 'success' && 
                  listofAssets.map(item=>{
                    return (
                        <CoinAsset key={item.id} asset={item}/>
                    )
                  })
                }
            </div>
            
        </div>
    )
}


