import { cityDetails } from "./data.js";
import { getDataForNextFiveHrs } from "./service.js";

/**
 * @description contructor cityObject
 *
 * @class cityObject
 * @param {String} cityName city name
 */
class cityObject {
  constructor(cityName) {
    this.name = cityName.toLowerCase();
    this.timeZone = cityDetails[this.name].timeZone;
    this.temperature = cityDetails[this.name].temperature;
    this.humidity = cityDetails[this.name].humidity;
    this.precipitation = cityDetails[this.name].precipitation;
    this.nextFiveHrs = cityDetails[this.name].nextFiveHrs;
  }

/**
 * @description changing celius to frenhiet
 * 
 * @param {string} tempCstr temperature of city in celius 
 * @returns 
 */
  calculateF(tempCstr) {
    const tempC = tempCstr.slice(0, -2);
    return Math.trunc(Number(tempC) * (9 / 5) + 32).toString() + " F";
  }

/**
 * @description get data for next five hours of selected cities
 * 
 * @param {string} currentCity current selected cityname 
 */
  async nextFiveHrss(currentCity) {
    let data = await getDataForNextFiveHrs(currentCity);
    this.nextFiveHrs = data.temperature;
  }

/**
 * @description changing with current date and time
 * 
 * @export {function}
 * @param {Date} dT current date and time 
 * @returns date
 */
  calculateDateAndTime(dT) {
    const dateAndTimeString = dT.split(",");
    dateAndTimeString[0] = new Date(dateAndTimeString);
    return dateAndTimeString;
  }

/**
 * @description time of the value
 * 
 * @export {function}
 * @param {Date} dateAndTime 
 * @returns time
 */
  calculateTime(dateAndTime) {
    dateAndTime = dateAndTime.trim();
    dateAndTime = dateAndTime.split(" ");
    let finalTime = dateAndTime[0].split(":");
    finalTime = finalTime.map((time) => time.padStart(2, 0));
    finalTime[finalTime.length] = dateAndTime[1];
    return finalTime;
  }

/**
 * @description getting month name as string 
 * 
 * @export {function}
 * @param {number} month 
 * @returns name of the month
 */
  calculateMonth(month) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[month];
  }
}

/**
 * @description contructor derviedCityobject
 *
 * @class dervied from cityObject
 * @param {String} cityName city name
 */
class derviedCityObject extends cityObject {
  constructor(cityName) {
    super(cityName);
  }

  /**
   * @description changing icon image
   * 
   * @param {number} val 
   * @returns string of name of climate
   */
  selectIcon(val) {
    val = val.slice(0, -2);
    if (val > 29) {
      return "sunnyIconBlack";
    } else if (val >= 23 && val <= 29) {
      return "cloudyIcon";
    } else if (val >= 18 && val <= 22) {
      return "windyIcon";
    } else {
      return "rainyIconBlack";
    }
  }
}

/**
 * @description function creating objects
 * 
 * @param {string} name 
 * @returns details of city as object
 */
function updateCurrentCity(name) {
  const cityInfo = new derviedCityObject(name);
  return cityInfo;
}

/**
 * @export {function}
 */
export { updateCurrentCity };
