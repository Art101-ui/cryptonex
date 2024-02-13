export type FetchedDataProps={
    id:string,
    symbol:string,
    name:string,
    image:string,
    current_price:number,
    one_hour:number,
    twenty_four:number,
    seven_day:number,
    total_volume:number,
    market_cap:number,
    circulating_supply:number,
    total_supply:number,
    chartData:[]
  }

 export type ChartDataProps={
    prices:[],
    market_caps:[],
    total_volumes:[]
  }

  export type AssetsProp ={
    id:string,
    name:string,
    symbol:string,
    image:string,
    price:number,
    market_cap:number,
    total_volume:number
    circ_supply: number,
    max_supply:number,
    twenty_four:number,
    date:string,
    purchased:number,
}

export type RequestDataType =
| { status: 'idle' }
| { status: 'loading' }
| { status: 'success', data: any }
| { status: 'error', error: any };

export type Data = {
  coins: number,
  markets: number,
  market_cap: number,
  total_volume: number,
  btc_percentage: number,
  eth_percentage: number,
  t4h_percentage: number
}

export  type StatusProps = 'loading' | 'error' | 'success' | 'idle'