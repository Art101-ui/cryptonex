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

  
