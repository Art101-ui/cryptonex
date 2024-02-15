import { createSlice } from "@reduxjs/toolkit";


type InitialState = {
  currency: string
}

const initialState: InitialState= {
    currency:'usd'
}


const changeCurrencySlice = createSlice({
    name:'changeCurrency',
    initialState,
    reducers: {
        changeCurrency:(state,action)=>{
            state.currency = action.payload
        },
    },
})

export const { changeCurrency } = changeCurrencySlice.actions;
export default changeCurrencySlice.reducer;