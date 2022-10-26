/**
 * @description changing with current date and time
 * 
 * @export {function}
 * @param {Date} dT current date and time 
 * @returns date
 */
function calculateDateAndTime(dT) {
  const dateAndTimeString = dT.split(",");
  dateAndTimeString[0] = new Date(dateAndTimeString);
  return dateAndTimeString;
}

/**
 * @description getting month name as string 
 * 
 * @export {function}
 * @param {number} month 
 * @returns name of the month
 */
function calculateMonth(month) {
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

/**
 * @description time of the value
 * 
 * @export {function}
 * @param {Date} dateAndTime 
 * @returns time
 */
function calculateTime(dateAndTime) {
  dateAndTime = dateAndTime.trim();
  dateAndTime = dateAndTime.split(" ");
  let finalTime = dateAndTime[0].split(":");
  finalTime = finalTime.map((time) => time.padStart(2, 0));
  finalTime[finalTime.length] = dateAndTime[1];
  return finalTime;
}

/**
 * @export {function}
 */
export { calculateTime, calculateMonth, calculateDateAndTime };
