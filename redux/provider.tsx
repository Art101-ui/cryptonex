"use client"

import { fetchCoins } from "./features/coinstable-slice";
import { fetchSearchCoins } from "./features/searchCoin-slice";
import { store } from "./store"
import { Provider } from "react-redux"

store.dispatch(fetchSearchCoins());
// store.dispatch(fetchCoins({currency:'usd',page:1}))

export function ReduxProvider({children}: {children:React.ReactNode}){
  return <Provider store={store}>{children}</Provider>
}


