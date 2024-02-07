"use client"

import { fetchSearchCoins } from "./features/searchCoin-slice";
import { store } from "./store"
import { Provider } from "react-redux"

store.dispatch(fetchSearchCoins());

export function ReduxProvider({children}: {children:React.ReactNode}){
  return <Provider store={store}>{children}</Provider>
}


