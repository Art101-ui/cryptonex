import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'


type ChartDataProps ={
    id: string,
    data:any
  }

type DataState = {
    chartCoins: ChartDataProps[]; 
    selectedCoins:string[],// Change 'any' to the specific type of your data if known
    loading: boolean;
    error: any | null; // Change 'string' to the specific type of your error if known
  }

const initialState: DataState = {
    chartCoins: [],
    selectedCoins:['bitcoin'],
    error:null,
    loading:false
}

// const SEARCH_COINS_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`

export const fetchCoinChart = createAsyncThunk('mainCoinChart/fetchCoinChart', async (latestId:string) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${latestId}/market_chart?vs_currency=usd&days=1&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`);
        const data= {id:latestId, data: response.data}
        return data;
    } catch (error:any) {
        return error.message;
    }
})

const mainCoinChartSlice = createSlice({
    name:'mainCoinChart',
    initialState,
    reducers: {
        addSelectedId(state,action:PayloadAction<string>){
            state.selectedCoins.push(action.payload)
        },
        removeSelectedId(state,action:PayloadAction<string>){
            state.selectedCoins = state.selectedCoins.filter(selectedId=>selectedId!==action.payload)
            state.chartCoins =state.chartCoins.filter(item=>item.id !== action.payload)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCoinChart.pending, (state)=>{
                state.loading = true;
            })
            .addCase(fetchCoinChart.fulfilled, (state, action:PayloadAction<any>)=>{
                state.loading = false;
                state.error = null
                state.chartCoins.push(action.payload);
            })
            .addCase(fetchCoinChart.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.error.message
            })
    }
})

export const {addSelectedId, removeSelectedId} = mainCoinChartSlice.actions
export default mainCoinChartSlice.reducer;