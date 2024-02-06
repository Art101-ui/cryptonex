import {configureStore} from '@reduxjs/toolkit';
import searchCoinReducer from './features/searchCoin-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
    reducer:{
        searchCoinReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch  = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;