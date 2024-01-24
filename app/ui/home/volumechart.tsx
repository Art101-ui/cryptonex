import React from "react";
import { Bar } from "react-chartjs-2";


function VolumeChart({ chartData }:{chartData:any}) {
  return (
    <div className="chart-container w-full h-[250px] ">
      <div>
        <h1 className=" text-[20px]">Bitcoin (BTC)</h1>
        <h3 className=" text-[28px]">$13.431 min</h3>
        <p className=" text-[16px]">September 29, 2023</p>
      </div>
      <Bar
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