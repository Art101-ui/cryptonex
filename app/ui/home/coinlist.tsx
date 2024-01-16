import { timeline } from "@material-tailwind/react"
import axios from "axios"
import { useEffect, useState } from "react"
import Coin from "./coin";
import { FetchedDataProps } from "@/app/lib/type";

type StatusProps = 'loading' | 'error' | 'success'


export default function CoinList(){
    const [data,setData] = useState<FetchedDataProps[]>([])
    const [status,setStatus] = useState<StatusProps>('loading')
    useEffect(() => {
        setStatus('loading')
        async function getData(){
          try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`)
            const data = await response.data
            const formattedData: FetchedDataProps[] = data.map((item: any) => ({
                id: item.id,
                symbol: item.symbol,
                name: item.name,
                image: item.image,
                current_price: item.current_price,
                one_hour:item.price_change_percentage_1h_in_currency,
                twenty_four:item.price_change_percentage_24h_in_currency,
                seven_day:item.price_change_percentage_7d_in_currency,
                total_volume:item.total_volume,
                market_cap:item.market_cap,
                circulating_supply:item.circulating_supply,
                total_supply:item.total_supply,
                chartData:item.sparkline_in_7d.price

              }));
            setData(formattedData)
            setStatus('success')
          } catch (error:any) {
            console.log(error)
            setStatus('error')
          }
        }
        getData()
      }, [])

      

     console.log(data)

      const isLoading = status === 'loading'
      if(isLoading){
        return <div>Loading...</div>
      }
    
    return(
        <div className="flex flex-col  gap-2">
         {
            data.map((item,index)=>{
                return(
                    <Coin key={item.id} coinData={item} index={index+1}/>
                )
            })
         }
        </div>
    )
}

