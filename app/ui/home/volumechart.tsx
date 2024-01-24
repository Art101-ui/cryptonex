import { formatDate } from "@/app/lib/utilis";
import React from "react";
import { Bar } from "react-chartjs-2";


function VolumeChart({ chartData }:{chartData:any}) {
  return (
    <div className="chart-container w-full h-[250px] ">
      <div>
        <h1 className=" text-[20px]">Volume 24h</h1>
        <p className=" text-[16px]">{formatDate()}</p>
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