'use client'

import { useState, useEffect } from "react"
import Modal from "@/app/ui/portfolio/modal"
import { SearchCoinProps, StatusProps } from "@/app/lib/type"
import CoinAsset from "@/app/ui/portfolio/coinasset"
import { useAppSelector } from "@/redux/store"




export default function Portfolio(){
    const storedlist = typeof localStorage!== 'undefined'? (localStorage.getItem('listofAssets') ? JSON.parse(localStorage.getItem('listofAssets') as string) : []):[];
    const [modal,setModal] = useState(false)
    const [status, setStatus] = useState<StatusProps>('idle')
    const [listofAssets, setListOfAssets] = useState<SearchCoinProps[]>(storedlist);
    const [coinData,setCoinData] = useState<SearchCoinProps[] | []>([])

    const {searchCoins, loading, error} = useAppSelector((state)=> state.searchCoinReducer)
    
    useEffect(() => {
      setCoinData(searchCoins)
    }, [searchCoins]);

    function handleAddAssets(id:string,amount:string,date:string,){
      const selectedCoin = coinData.find(item=>item.id===id) as SearchCoinProps ;
       setListOfAssets([...listofAssets,{...selectedCoin,purchased:amount,date:date}])
    }

    console.log(listofAssets)
    console.log(searchCoins)
    
      // Save state to local storage when it changes
  useEffect(() => {
    localStorage.setItem('listofAssets', JSON.stringify(listofAssets));
  }, [listofAssets]);

 
   function handleDeleteAsset(id:string){
    setListOfAssets(listofAssets.filter(item=>item.id !== id))
   }

    

    return (
        <div>
            {modal && 
              <div onClick={()=>setModal(false)} className="  absolute top-0 bottom-0 right-0 left-0 flex z-50 justify-center items-center bg-[#262437]/30 backdrop-blur-sm">
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
                { 
                  listofAssets.map(item=>{
                    return (
                        <CoinAsset key={item.id} onDeleteAsset={handleDeleteAsset} asset={item}/>
                    )
                  })
                }
            </div>
            
        </div>
    )
}


