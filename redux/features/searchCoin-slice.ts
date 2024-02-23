import { SearchCoinProps } from '@/app/lib/type'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'


type DataState = {
    searchCoins: SearchCoinProps[] |  []; // Change 'any' to the specific type of your data if known
    loading: boolean;
    error: any | null; // Change 'string' to the specific type of your error if known
  }



const initialState: DataState = {
    searchCoins: [],
    error:null,
    loading:false
}

const SEARCH_COINS_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`

export const fetchSearchCoins = createAsyncThunk('searchCoins/fetchSearchCoins', async (currency?:string) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`);
        const data = response.data.map((item :any) =>{
            return {
                id: item.id,
                symbol:item.symbol,
                name: item.name,
                image: item.image,
                current_price: item.current_price,
                market_cap: item.market_cap,
                volume: item.total_volume,
                circulating_supply: item.circulating_supply,
                total_supply: item.total_supply,
                twenty_four: item.price_change_percentage_24h, 
                date:'',
                purchased:''              
            }
        })
        return data;
    } catch (error:any) {
        return error.message;
    }
})

const searchCoinsSlice = createSlice({
    name:'searchCoins',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchSearchCoins.pending, (state)=>{
                state.loading = true;
            })
            .addCase(fetchSearchCoins.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = null
                state.searchCoins = action.payload;
            })
            .addCase(fetchSearchCoins.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.error.message
            })
    }
})

export default searchCoinsSlice.reducer;