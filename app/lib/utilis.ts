import { ChartDataProps, FetchedDataProps } from "./type";

export function getDayNumber(timestamp:EpochTimeStamp) {
    const date = new Date(timestamp);
    return date.getDate();
  }

export function reduceData(listOfArray:[], timefactor:number): [] {
    let result: [] = [];
    for(let i =0; i<listOfArray.length; i++){
      if(i%timefactor===0){
        result.push(listOfArray[i])
      }
    }
  
    return result;
  }


export function getPercentage(a:number,b:number){
    return Math.floor((a/b)*100)
}

export function convertToThousand(value:number){
  return Math.round(value/1000)
}


export function formatDate() {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentDate = new Date();
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
}

type CoinListProp ={
  id: string;
  name:string,
  image:string,  
}

export function searchItems(items:CoinListProp[], query:string) {
  query = query.toLowerCase();
 
  return items.filter(item =>
    item.name.split(' ').some(word =>
      word.toLowerCase().startsWith(query)
    )
  );
}

export function prettifyDate(inputDate:string) {
  if (inputDate === '') {
    return ' '
  }
  const date = new Date(inputDate);
  
  const options:Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  
  return date.toLocaleDateString('en-US', options);
}

// export function getReformedData(listOfArray:any[]){
//    const newData = listOfArray.map(item=>{
//     let newArr:[]=[]
//     if(listOfArray.length > 100 && listOfArray.length < 750){
//       newArr = reduceData(listOfArray,20)
//     }else if(listOfArray.length <= 2000 ){
//         newArr = reduceData(listOfArray,80)
//     }else if(listOfArray.length <= 4000 ){
//         newArr = reduceData(listOfArray,200)
//     }
//      return {time:item.prices[0],value:item.prices[1]}
//    })
//    return newData
// }
  
