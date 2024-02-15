import axios from "axios";
import { Data } from "./type";

export const getGlobalData: ()=> Promise<Data>  = async ()=> {
    try {
      
      const response = await axios.get('https://api.coingecko.com/api/v3/global');

      const data: Data = {
        coins: response.data.data.active_cryptocurrencies,
        markets: response.data.data.markets,
        market_cap: response.data.data.total_market_cap.usd,
        total_volume: response.data.data.total_volume.usd,
        btc_percentage: response.data.data.market_cap_percentage.btc,
        eth_percentage: response.data.data.market_cap_percentage.eth,
        t4h_percentage: response.data.data.market_cap_change_percentage_24h_usd
      };
  
      return data;
       
    } catch (error) {
        throw error;
    }
  }

 