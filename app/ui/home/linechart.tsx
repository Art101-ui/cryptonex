import React from "react";
import { Line } from "react-chartjs-2";


function LineChart({ chartData, width,height }:{chartData:any,width:string,height:string}) {
  return (
    <div className={width +' '+ height}>
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