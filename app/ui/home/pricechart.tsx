import { RequestDataProps } from "@/app/lib/type";
import { formatDate, getDayNumber, reduceData } from "@/app/lib/utilis";
import { CategoryScale, ScriptableContext } from "chart.js";
import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale)
function PriceChart({showHeading, selectedIds, chartData,height }:{showHeading?:boolean,chartData:RequestDataProps[], height:string, selectedIds:string[]}) {
   
  const prices = chartData.map(item=>{
    let newArr:[]=[]
    if(item.data.prices.length > 100 && item.data.prices.length < 750){
      newArr = reduceData(item.data.prices,20)
    }else if(item.data.prices.length <= 2000 ){
        newArr = reduceData(item.data.prices,80)
    }else if(item.data.prices.length <= 4000 ){
        newArr = reduceData(item.data.prices,200)
    }
    return newArr
  })||[]

    const firstreformedPrice = prices && prices.length > 0 ?  prices[0].map((item)=>{
      return {time:getDayNumber(item[0]), value:item[1]}
    }) : [] 
    const secondreformedPrice = prices && prices.length > 1 ? prices[1].map((item)=>{
        return {time:getDayNumber(item[0]), value:item[1]}
      }) : [] 

    const thirdreformedPrice = prices && prices.length > 2 ? prices[2].map((item)=>{
        return {time:getDayNumber(item[0]), value:item[1]}
      }) : [] 

    var priceChart = {
          labels: firstreformedPrice.map((data) => data.time), 
          datasets: [
            {
              label: selectedIds[0] ? selectedIds[0].charAt(0).toUpperCase() + selectedIds[0].slice(1) : '',
              data: firstreformedPrice.map((data) => data.value),
              backgroundColor: (context: ScriptableContext<"line">) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 250);
                gradient.addColorStop(0, "rgba(116, 116, 242, 0.7)");
                gradient.addColorStop(1, "rgba(116, 116, 242, 0.08)");
                return gradient;
              },
              borderColor: "rgba(116, 116, 242, 1)",
              yAxisID:'y-axis-1',
              borderWidth: 1,
              tension:0.4,
              pointRadius:0,
              fill: 'start',
            },
            {
              label: selectedIds[1] ? selectedIds[1].charAt(0).toUpperCase() + selectedIds[1].slice(1) : '',
              data: secondreformedPrice.map((data) => data.value),
              backgroundColor: (context: ScriptableContext<"line">) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 250);
                gradient.addColorStop(0, "rgba(38, 161, 123, 0.7)");
                gradient.addColorStop(1, "rgba(38, 161, 123, 0.08)");
                return gradient;
              },
              borderColor: "rgba(38, 161, 123, 1)",
              borderWidth: 1,
              yAxisID:'y-axis-2',
              tension:0.4,
              pointRadius:0,
              fill: 'start',
            },
            {
              label:selectedIds[2] ? selectedIds[2].charAt(0).toUpperCase() + selectedIds[2].slice(1) : '',
              data: thirdreformedPrice.map((data) => data.value),
              backgroundColor: (context: ScriptableContext<"line">) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 250);
                gradient.addColorStop(0, "rgba(254, 34, 100, 0.7)");
                gradient.addColorStop(1, "rgba(254, 34, 100, 0.08)");
                return gradient;
              },
              borderColor: "rgba(254, 34, 100, 1)",
              borderWidth: 1,
              yAxisID:'y-axis-3',
              tension:0.4,
              pointRadius:0,
              fill: 'start',
            },
          ]
  }

  let chartCoins = [
    {id:0, color:'bg-[#7474f2b3]' ,coin: selectedIds[0]},
    {id:1, color:'bg-[#26a17bb3]' ,coin: selectedIds[1]},
    {id:2, color:'bg-[#fe2264b3]' ,coin: selectedIds[2]},
  ]


  return (
    <div className={`chart-container w-full ${height}`}>
      {showHeading && <div>
        {/* <h1 className=" text-[20px]">Bitcoin (BTC)</h1> */}
        <h1 className=" text-[24px] md:text-[28px]">{formatDate()}</h1>
        <ul className="flex items-center gap-4">
          {
            chartCoins.map(item=>{
              if(item){
                return (
                 <div key={item.id} className=" flex items-center gap-2">
                    {
                      item.coin && (
                        <>
                          <div className={' w-6 h-5 ' + item.color}></div>
                          <p className=" text-[16px] dark:text-[#B9B9BA]">{item.coin.charAt(0).toUpperCase()+item.coin.slice(1)}</p>
                        </>
                      )

                    }
                 </div>
                 )

              }
            })
          }
        </ul>
      </div>}
      <Line
        data={priceChart}
       
        options={{
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: ""
            },
            legend: {
              display: false
              
            },
          },
          scales:{
            x:{
              grid:{
                display:false
              }
            },
            "y-axis-1": {
              display: false,
              grid:{
                display:false
              },
              beginAtZero: false
            },
            "y-axis-2":{
              display:false,
              grid:{
                display:false
              },
              beginAtZero: false
            },
            "y-axis-3":{
              display:false,
              grid:{
                display:false
              },
              beginAtZero: false
            },
            
          }
        }}
      />
    </div>
  );
}
export default PriceChart;