import { RequestDataProps } from "@/app/lib/type";
import { formatDate, getDayNumber, reduceData } from "@/app/lib/utilis";
import { CategoryScale, ScriptableContext } from "chart.js";
import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale)
function VolumeChart({ chartData }:{chartData:RequestDataProps[]}) {
  
  const volumes =  chartData.map(item=>{
    let newArr:[]=[]
    if(item.data.total_volumes.length > 100 && item.data.total_volumes.length < 750){
      newArr = reduceData(item.data.total_volumes,20)
    }else if(item.data.total_volumes.length <= 2000 ){
        newArr = reduceData(item.data.total_volumes,80)
    }else if(item.data.total_volumes.length <= 4000 ){
        newArr = reduceData(item.data.total_volumes,200)
    }
    return newArr
  })||[]
 

    // Volume Chart
  const firstreformedVolume =volumes && volumes.length > 0 ? volumes[0].map((item)=>{
      return {time:getDayNumber(item[0]), value:item[1]}
    }) : [] 
  const secondreformedVolume =volumes && volumes.length > 1 ? volumes[1].map((item)=>{
      return {time:getDayNumber(item[0]), value:item[1]}
    }) : [] 
  const thirdreformedVolume =volumes && volumes.length > 2 ? volumes[2].map((item)=>{
      return {time:getDayNumber(item[0]), value:item[1]}
    }) : [] 

  



  var volumeChart = {
        labels: firstreformedVolume.map((data) => data.time), 
        datasets: [
          {
            label: "Bitcoin",
            data: firstreformedVolume.map((data) => data.value),
            backgroundColor: (context: ScriptableContext<"bar">) => {
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
            label: "Ethereum",
            data: secondreformedVolume.map((data) => data.value),
            backgroundColor: (context: ScriptableContext<"bar">) => {
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
            label: "Tether",
            data: thirdreformedVolume.map((data) => data.value),
            backgroundColor: (context: ScriptableContext<"bar">) => {
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
  return (
    <div className="chart-container w-full h-[250px] ">
      <div>
        <h1 className=" text-[28px]">Volume 24h</h1>
        <p className=" text-[16px]">{formatDate()}</p>
      </div>
      <Bar
        data={volumeChart}
        options={{
          
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: ""
            },
            legend: {
              display: false
            }
          },
          scales:{
            x:{
              stacked:true,
              grid:{
                display:false
              }
            },
            y:{
              stacked:true,
              display:false,
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
export default VolumeChart;