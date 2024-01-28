import { formatDate } from "@/app/lib/utilis";
import React from "react";
import { Line } from "react-chartjs-2";


function PriceChart({showHeading, chartData,height }:{showHeading?:boolean,chartData:any, height:string}) {
  return (
    <div className={`chart-container w-full ${height}`}>
      {showHeading && <div>
        <h1 className=" text-[20px]">Bitcoin (BTC)</h1>
        <h3 className=" text-[28px]">$807.243 bin</h3>
        <p className=" text-[16px]">{formatDate()}</p>
      </div>}
      <Line
        data={chartData}
       
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
export default PriceChart;