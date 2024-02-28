import { useEffect, useState, useRef } from "react"
import Coin from "./coin";
import { FetchedDataProps } from "@/app/lib/type";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { fetchCoins } from "@/redux/features/coinstable-slice";
import DefaultSpinner from '../loadingSpinner'



export default function CoinList(){
  const [data,setData] = useState<FetchedDataProps[]>([])
  const [dataStatus, setDataStatus] = useState()
  const [page, setPage] = useState<number>(2)
  const [hasMore, sethasMore] = useState(true)
  const elementRef = useRef(null)
  const currency = useAppSelector(state=>state.changeCurrencyReducer.currency)
  
  const {coins} = useAppSelector((state)=> state.coinstableReducer);
  const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
      setData(coins)
    }, [coins])

    
    useEffect(() => {
      const observer = new IntersectionObserver((entries:any)=>{
        const firstEntry = entries[0]
        if(firstEntry.isIntersecting && hasMore){
          dispatch(fetchCoins({currency:currency,page:page}))   
          setPage(prev=>prev+1)
        }
      })

      if(observer && elementRef.current){
        observer.observe(elementRef.current)     
      }

      return ()=>{
        if(observer){
          observer.disconnect()
        }
      }
    }, [data,dispatch])
    
   
    
   
      return(
        
        <div className="flex flex-col  gap-2">
         {
            data.map((item,index)=>{
                return(
                   <Link key={item.id} href={`/coinInfo/${item.name.toLowerCase()}`}>
                     <Coin  coinData={item} index={index+1}/>              
                   </Link>
                )
            })
         }
         {hasMore && <div ref={elementRef} className="flex justify-center items-center"><DefaultSpinner/></div>}
        </div>
      )
}


