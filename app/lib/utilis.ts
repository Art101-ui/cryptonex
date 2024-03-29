
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
  
export function getCurrentDateTime(): string {
  const now = new Date();

  // Get the date components
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const year = now.getFullYear();

  // Get the time components
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  // Assemble the date and time in the desired format
  const dateTime = `${month}/${day}/${year} ${hours}:${minutes}`;

  return dateTime;
}

export function handleUndefinedForChart(firstPrice:[],secondPrice:[],switchcoin:boolean){
  let prices: number[]= [];
  if (firstPrice && secondPrice && firstPrice.length === secondPrice.length) {
    if(switchcoin){
      prices = firstPrice.map((item, index) => {
             return item / secondPrice[index];          
     });
    }else{
      prices = secondPrice.map((item, index) => {
        return item / firstPrice[index];          
});
    }
  } else {
      // Handle case where arrays are undefined or have different lengths
      console.error('Arrays are undefined or have different lengths.');
  }
  return prices;
}

export function handleUndefinedForValue(item:any){
  if(item===undefined || item === null){
   return ' '
  }else{
   return item;
  }
}

export function getCurrencySymbol(currency:string,word?:boolean){
  if(currency==='usd'){
    if(word){
      return 'USD'
    }
    return '$'
  }else if(currency==='gbp'){
    if(word){
      return 'GBP'
    }
    return '£'
  }else if(currency==='eur'){
    if(word){
      return 'EUR'
    }
    return '€'
  }
}

export function roundValue(value:number):number {
    
  const valueString = value.toString();
  
  const decimalIndex = valueString.indexOf('.');
  if (decimalIndex !== -1) {
      
      const decimalPlaces = valueString.length - decimalIndex - 3;
      const multiplier = Math.pow(10, decimalPlaces);
      
     
      return Math.round(value * multiplier) / multiplier;
  } else {
      
      return value;
  }
}