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

export function convertToMillion(value:number){
  return Math.round(value/1000000)
}

export function convertToBillion(value:number){
  return (value/1000000000).toFixed(2)
}

export function convertToTrillion(value:number){
  return (value/1000000000000).toFixed(2)
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


export function searchItems(items:any[], query:string) {
  query = query.toLowerCase();
 
  return items.filter(item =>
    item.name.split(' ').some((word:string) =>
      word.toLowerCase().startsWith(query)
    )
  );
}

export  function reformDataLength(listOfArray:[]){
  let newArr:[]=[]
  if(listOfArray.length > 100 && listOfArray.length < 240){
    newArr = reduceData(listOfArray,5)
  }else if(listOfArray.length > 240 && listOfArray.length < 750){
    newArr = reduceData(listOfArray,20)
  }else if(listOfArray.length <= 2000 ){
      newArr = reduceData(listOfArray,80)
  }else if(listOfArray.length <= 4000 ){
      newArr = reduceData(listOfArray,200)
  }
  return newArr
}

export function changeDate(dateString: string): string {
  // Create a new Date object from the provided date string
  const date = new Date(dateString);

  // Define options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
      weekday: 'short', // Abbreviated weekday name (e.g., "Wed")
      month: 'short', // Abbreviated month name (e.g., "Nov")
      day: '2-digit', // Two-digit day of the month (e.g., "10")
      year: 'numeric' // Full numeric representation of the year (e.g., "2021")
  };

  // Format the date using the specified options
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate;
}
  
