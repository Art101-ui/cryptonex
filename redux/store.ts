import {configureStore} from '@reduxjs/toolkit';
import searchCoinReducer from './features/searchCoin-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import changeCurrencyReducer from './features/changeCurrency-slice';
import coinstableReducer from './features/coinstable-slice';
import mainCoinChartReducer from './features/mainCoinChart-slice'


export const store = configureStore({
    reducer:{
        searchCoinReducer,
        changeCurrencyReducer,
        coinstableReducer,
        mainCoinChartReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch  = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;