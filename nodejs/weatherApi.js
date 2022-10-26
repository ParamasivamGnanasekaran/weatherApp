//Import modules
const express = require("express");
const app = express();
const url = require("url");
let bodyParser = require("body-parser");
let childProcess = require("child_process");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
const path = require("path");

app.use(express.static(__dirname + "../"));

// Server PORT number
let port = process.env.PORT || 3000;

//Rendering html content of user enter form
app.get("/", function (req, res) {
  let indexPath = path.join(__dirname, "../index.html");
  res.sendFile(indexPath);
});

//Rendering css content of user enter form
app.get("/CSS/*.css", function (req, res) {
  let indexPath = path.join(__dirname, ".." + req.url);
  res.sendFile(indexPath);
});

//Rendering javascript content of user enter form
app.get("/javascript/*.js", function (req, res) {
  let indexPath = path.join(__dirname, ".." + req.url);
  res.sendFile(indexPath);
});

//Rendering svg content of user enter form
app.get("/assets/*.svg", function (req, res) {
  let indexPath = path.join(__dirname, ".." + req.url);
  res.sendFile(indexPath);
});

//Rendering ico content of user enter form
app.get("/assets/*.ico", function (req, res) {
  let indexPath = path.join(__dirname, ".." + req.url);
  res.sendFile(indexPath);
});

// send all cities timeZone
app.get("/allcity", (req, res) => {
  childFunction(req.url).then((FinalData) => {
    res.json(FinalData);
  });
});

// send a city time to get city time date & name
app.get("/cityname", (req, res) => {
  let requestUrl = url.parse(req.url, true);
  let pathname = requestUrl.pathname;
  let cityName = req.query.city;
  if (cityName) {
    childFunction(pathname, cityName).then((FinalData) => {
      res.json(FinalData);
    });
  } else {
    res.status(404).json({ Error: "Please request a valid city name" });
  }
});

// send hourly forecast for one city
app.post("/hourlyforecast", (req, res) => {
  let requestUrl = url.parse(req.url, true);
  let pathname = requestUrl.pathname;
  let city_Date_Time_Name = req.body.city_Date_Time_Name;
  let hours = req.body.hours;
  if (city_Date_Time_Name && hours) {
    childFunction(pathname, city_Date_Time_Name, hours).then((FinalData) => {
      res.json(FinalData);
    });
  } else {
    res
      .status(404)
      .json({ Error: "Not a Valid EndPoint. Please check API Doc" });
  }
});

// listen for requests'
app.listen(port, () => {
  console.log(`App listening on port ${port} `);
});

/**
 * @description function to run child process for weather computations
 *
 * @param {Array} parameters array of required data based on the client request
 * @argument {Array} fetchedData weather data computed specific to the request
 *
 * @returns {Promise}
 */
function childFunction(...args) {
  const finalPromise = new Promise(function (resolve, reject) {
    let finalData = [];
    const child = childProcess.fork("./nodejs/childServer.js");
    child.send(args);
    child.on("message", (message) => {
      finalData = message;
      resolve(finalData);
    });
  });

  return finalPromise;
}
