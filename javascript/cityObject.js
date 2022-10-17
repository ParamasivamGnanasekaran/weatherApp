import { cityDetails } from "./data.js";
import { getDataForNextFiveHrs } from "./service.js";

// function cityObject(cityName){
//     this.name= cityName.toLowerCase();
//     //this.cityDate = cityDetails[this.name].dateAndTime.split(",")[0];
//     //this.cityTime = cityDetails[this.name].dateAndTime.split(",")[1];
//     this.timeZone = cityDetails[this.name].timeZone;
//     this.temperature = cityDetails[this.name].temperature;
//     this.humidity = cityDetails[this.name].humidity;
//     this.precipitation = cityDetails[this.name].precipitation;
//     this.nextFiveHrs =cityDetails[this.name].nextFiveHrs;
// }

// cityObject.prototype.calculateF= function (tempCstr) {
//     const tempC = tempCstr.slice(0, -2);
//     return Math.trunc((((Number(tempC)) * (9 / 5)) + 32)).toString() + ' F';
//   }

// cityObject.prototype.calculateDateAndTime= function(dT) {
//     const dateAndTimeString = dT.split(",");
//     dateAndTimeString[0] = new Date(dateAndTimeString);
//     //calculateTime(dateAndTimeString[1]);
//     return dateAndTimeString;
//   }
// cityObject.prototype.calculateTime= function (dateAndTime) {
//     dateAndTime = dateAndTime.trim();
//     dateAndTime = dateAndTime.split(" ");
//     let finalTime = dateAndTime[0].split(":");
//     finalTime = finalTime.map((time) => time.padStart(2, 0));
//     finalTime[finalTime.length] = dateAndTime[1];
//     return finalTime;
//   }

//   cityObject.prototype.calculateMonth = function (month) {
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     return months[month];
//   }

//   function selectIcon(val) {
//     val = val.slice(0, -2);
//     if (val > 29) {
//       return "sunnyIconBlack";
//     } else if (val >= 23 && val <= 29) {
//       return "cloudyIcon";
//     } else if (val >= 18 && val <= 22) {
//       return "windyIcon";
//     } else {
//       return "rainyIconBlack"
//     }
//   }

//   function updateCurrentCity(name){
//   const cityInfo = new cityObject(name);
//   cityInfo.__proto__.selectIcon = selectIcon;
//   return cityInfo;
//   } 
// export { updateCurrentCity };

class cityObject{

  constructor(cityName){
    this.name= cityName.toLowerCase();
    //this.cityDate = cityDetails[this.name].dateAndTime.split(",")[0];
    //this.cityTime = cityDetails[this.name].dateAndTime.split(",")[1];
    this.timeZone = cityDetails[this.name].timeZone;
    this.temperature = cityDetails[this.name].temperature;
    this.humidity = cityDetails[this.name].humidity;
    this.precipitation = cityDetails[this.name].precipitation;
    this.nextFiveHrs =cityDetails[this.name].nextFiveHrs;
  }

calculateF(tempCstr) {
    const tempC = tempCstr.slice(0, -2);
    return Math.trunc((((Number(tempC)) * (9 / 5)) + 32)).toString() + ' F';
  }

  async nextFiveHrss(currentCity){
    let data = await getDataForNextFiveHrs(currentCity);
    this.nextFiveHrs =data.temperature;
  }
calculateDateAndTime(dT) {
    const dateAndTimeString = dT.split(",");
    dateAndTimeString[0] = new Date(dateAndTimeString);
    //calculateTime(dateAndTimeString[1]);
    return dateAndTimeString;
  }
calculateTime(dateAndTime) {
    dateAndTime = dateAndTime.trim();
    dateAndTime = dateAndTime.split(" ");
    let finalTime = dateAndTime[0].split(":");
    finalTime = finalTime.map((time) => time.padStart(2, 0));
    finalTime[finalTime.length] = dateAndTime[1];
    return finalTime;
  }

  calculateMonth(month) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[month];
  }
}

 

  class derviedCityObject extends cityObject{
    constructor(cityName){
       super(cityName);
    }

    selectIcon(val) {
      val = val.slice(0, -2);
      if (val > 29) {
        return "sunnyIconBlack";
      } else if (val >= 23 && val <= 29) {
        return "cloudyIcon";
      } else if (val >= 18 && val <= 22) {
        return "windyIcon";
      } else {
        return "rainyIconBlack"
      }
    }
  }

  function updateCurrentCity(name){
    const cityInfo = new derviedCityObject(name);
    return cityInfo;
    } 

  export { updateCurrentCity };