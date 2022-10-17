

function calculateDateAndTime(dT) {
    const dateAndTimeString = dT.split(",");
    dateAndTimeString[0] = new Date(dateAndTimeString);
    //calculateTime(dateAndTimeString[1]);
    return dateAndTimeString;
  }
  
function calculateMonth(month) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[month];
  }
  
function calculateTime(dateAndTime) {
    dateAndTime = dateAndTime.trim();
    dateAndTime = dateAndTime.split(" ");
    let finalTime = dateAndTime[0].split(":");
    finalTime = finalTime.map((time) => time.padStart(2, 0));
    finalTime[finalTime.length] = dateAndTime[1];
    return finalTime;
  }


  export {calculateTime, calculateMonth, calculateDateAndTime};