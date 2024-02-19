import { timeline } from "@material-tailwind/react"
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import Coin from "./coin";
import { FetchedDataProps, StatusProps } from "@/app/lib/type";
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
  
  const {coins, status} = useAppSelector((state)=> state.coinstableReducer);
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
    
   
    // function onIntersection(entries:any){
    //   const firstEntry = entries[0]
    //   if(firstEntry.isIntersecting && hasMore){
    //        dispatch(fetchCoins({currency:'usd',page:page}))   
         
    //   }
    // }

    // console.log(`Coins: ${coins}`)
    // console.log(`Data: ${data}`)
    
    
    
    // async function getData(){
    //     setStatus('loading')
    //     try {
    //       const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`)
    //       const data = await response.data
    //       if(data.length === 0){
    //         sethasMore(false)
    //       }else{
    //         const formattedData: FetchedDataProps[] = data.map((item: any) => ({
    //             id: item.id,
    //             symbol: item.symbol,
    //             name: item.name,
    //             image: item.image,
    //             current_price: item.current_price,
    //             one_hour:item.price_change_percentage_1h_in_currency,
    //             twenty_four:item.price_change_percentage_24h_in_currency,
    //             seven_day:item.price_change_percentage_7d_in_currency,
    //             total_volume:item.total_volume,
    //             market_cap:item.market_cap,
    //             circulating_supply:item.circulating_supply,
    //             total_supply:item.total_supply,
    //             chartData:item.sparkline_in_7d.price
  
    //           }));
    //         setData(prev=>[...prev, ...formattedData])
    //         setPage(prev=>prev+1)
    //       }
    //       setStatus('success')
    //     } catch (error:any) {
    //       console.log(error)
    //       setStatus('error')
    //     }
    //   }

   

    
   
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


