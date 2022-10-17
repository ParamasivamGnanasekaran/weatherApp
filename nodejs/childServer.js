const timeZone = require('./timeZone');




process.on("message", (parameters) => {
    let dataFinal = [];
    if (parameters[0] === "/allcity") {
        dataFinal = timeZone.allTimeZones();
      } else if(parameters[0] === "/cityname") {
      dataFinal = timeZone.timeForOneCity(parameters[1]);
    } else if (parameters[0] === "/hourlyforecast") {
     let data = timeZone.allTimeZones();
      dataFinal = timeZone.nextNhoursWeather(parameters[1], parameters[2], data);
    } 
  
    process.send(dataFinal);
    process.exit();
  });
