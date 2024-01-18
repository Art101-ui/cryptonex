import React from "react";
import { Line } from "react-chartjs-2";


function LineChart({ chartData }:{chartData:any}) {
  return (
    <div className="chart-container w-[120px] h-[37px] ">
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: false,
              text: ""
            },
            legend: {
              display: false,
              
            },
          },
          scales:{
            x:{
              display:false,
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
export default LineChart;