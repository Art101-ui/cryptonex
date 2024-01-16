import React from "react";
import { Line } from "react-chartjs-2";


function PriceChart({ chartData }:{chartData:any}) {
  return (
    <div className="chart-container w-full h-[250px]">
      <div>
        <h1 className=" text-[20px]">Volume 24h</h1>
        <h3 className=" text-[28px]">$807.243 bin</h3>
        <p className=" text-[16px]">September 29, 2023</p>
      </div>
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
              display: true,
              
            },
          },
          scales:{
            x:{
              grid:{
                display:false
              }
            },
            y:{
              display:false,
              grid:{
                display:false
              }
            }
          }
        }}
      />
    </div>
  );
}
export default PriceChart;