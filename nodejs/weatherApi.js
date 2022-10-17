//const http = require('http');
//const url = require('url');

const express = require("express");
const app = express();
const url = require('url');
let bodyParser = require('body-parser');
let childProcess = require('child_process');
app.use(bodyParser.urlencoded({extended:false}));  
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors({
    origin:'*'
}));
const path = require("path");

app.use(express.static(__dirname + '../'));
//const timeZone = require('./timeZone');
//const data = timeZone.allTimeZones();


// app.get('/', function(req,res){
//     let indexPath = path.join(__dirname, "../index.html");
//   res.sendFile(indexPath);
// });

// app.get('/CSS/*.css', function(req,res){
//     let indexPath = path.join(__dirname, ".." + req.url);
//     res.sendFile(indexPath);
// });

// app.get('/javascript/*.js', function(req,res){
//     let indexPath = path.join(__dirname, ".." + req.url);
//     res.sendFile(indexPath);
// });

// app.get('/assets/*.svg', function(req,res){
//     let indexPath = path.join(__dirname, ".." + req.url);
//     res.sendFile(indexPath);
// });

// app.get('/assets/*.ico', function(req,res){
//   let indexPath = path.join(__dirname, ".." + req.url);
//   res.sendFile(indexPath);
// });

app.get("/allcity", (req, res) => {
     childFunction(req.url).then((FinalData) => {
      res.json(FinalData);
    });;
})

app.get("/cityname", (req, res) => {
  let requestUrl = url.parse(req.url, true);
  let pathname = requestUrl.pathname;
  let cityName = req.query.city;
      if (cityName) {
            childFunction(pathname,cityName).then((FinalData) => {
            res.json(FinalData);
          });
        } else {
          res.status(404).json({ Error: "Please request a valid city name" });
        }
})

app.post("/hourlyforecast", (req, res) => {
  let requestUrl = url.parse(req.url, true);
  let pathname = requestUrl.pathname;
  let city_Date_Time_Name = req.body.city_Date_Time_Name;
  let hours = req.body.hours;
      if (city_Date_Time_Name && hours) {
        childFunction(pathname,city_Date_Time_Name, hours).then((FinalData) => {
          res.json(FinalData);
        });;
      } else {
        res.status(404).json({ Error: "Not a Valid EndPoint. Please check API Doc" });
      }
})





function childFunction(...args){
  const finalPromise = new Promise(function(resolve,reject) {
  let finalData=[];
  const child = childProcess.fork("./childServer.js");
  child.send(args);
  child.on('message', message=>{
  finalData=message;
  resolve(finalData); 
  });
});

return finalPromise;
}

app.listen(3000, () => {
  console.log(`Example app listening on port `)
})

// http.createServer(function (req, res) {
//   let requestUrl = url.parse(req.url, true);
//   let pathname = requestUrl.pathname;
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   if (req.url === "/allcity" && req.method === "GET"){
//     let weather = timeZone.allTimeZones();
//     res.writeHead(200);
//     res.end(JSON.stringify(weather));
//   }else if(pathname === "/cityname" && req.method === "GET"){
//      let query = requestUrl.query
//      let cityName = query.city;
//     if (cityName) {
//       res.writeHead(200);
//       res.end(JSON.stringify(timeZone.timeForOneCity(cityName)));
//     } else {
//       res.writeHead(404);
//       res.end({ Error: "Please request a valid city name"});
//     }
//   }else if(pathname === "/hourlyforecast" && req.method === "POST"){
//    // let query = requestUrl.query
//   //  let cityName = query.city;
//     let body = [];
//     req.on('data', function(data) {
//       body += data.toString();
//     });
//     req.on("end", () => {
//       body = JSON.parse(body);
//       let city_Date_Time_Name = body.city_Date_Time_Name;
//       let hours = body.hours;
//       if (city_Date_Time_Name && hours) {
//         res.writeHead(200);
//         res.end(JSON.stringify(timeZone.nextNhoursWeather(city_Date_Time_Name, hours, data)));
//       } else {
//         res.writeHead(404);
//         res.end({ Error: "Not a Valid EndPoint. Please check API Doc" });
//       }
//     });
//  }
// }).listen(3000, () => {
//   console.log("Listening to port " + 3000);
// });