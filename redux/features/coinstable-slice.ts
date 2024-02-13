import { FetchedDataProps } from '@/app/lib/type';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import { changeCurrency} from './changeCurrency-slice'


// type InitialState = {
//     id:string,
//     symbol:string,
//     name:string,
//     image:string,
//     current_price:number
// }

type DataState = {
    coins: FetchedDataProps[] | []; // Change 'any' to the specific type of your data if known
    status: 'idle' | 'loading' | 'error' | 'success'// Change 'string' to the specific type of your error if known
  }



const initialState: DataState = {
    coins: [],
    status:'idle'
}

// const COINS_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`

export const fetchCoins = createAsyncThunk('coins/fetchCoins', async ({currency, page}:{currency?:string,page?:number},thunkAPI) => {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`);
        const data = response.data.map((item :any) =>{
            return {
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
                chartData:item.sparkline_in_7d.price,
            }
        })
        return data;
    
})



const coinstableSlice = createSlice({
    name:'coins',
    initialState,
    reducers: {
        changePrice(state,action){
            state.coins = state.coins.map((item)=>{
                return {
                    ...item,
                    current_price: item.current_price * action.payload
                }
            })
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCoins.pending, (state:DataState)=>{
                state.status = 'loading';
            })
            .addCase(fetchCoins.fulfilled, (state, action)=>{
                const {currency,page} = action.meta.arg

                state.status = 'success' 
                if(currency && page==1){
                    state.coins = action.payload
                }else if(page! > 1){
                    state.coins = state.coins.concat(action.payload);
                }          
            })
            .addCase(fetchCoins.rejected, (state,action)=>{
                state.status = 'error'
            })
    }
})


export default coinstableSlice.reducer;
export const { changePrice } = coinstableSlice.actions;