//const url = "https://soliton.glitch.me/all-timezone-cities";
let hostname = location.hostname;
let port = location.port;
const url = `http://${hostname}:${port}/allcity`;
function modifydata(data) {
  let cityData = [];
  data.forEach((element) => {
    cityData[element.cityName.toLowerCase()] = element;
    cityData.concat(cityData);
  });
  return cityData;
}

/**
 * @description get all city details
 * 
 * @returns get a city details
 */
async function getData() {
  let cityDetails = new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        resolve(modifydata(data));
      })
      .catch((error) => {
        reject(error);
      });
  });
  return cityDetails;
}

/**
 * @description get hourly data of the city
 * 
 * @param {string} cityName selected city name 
 * @returns get data next five hours
 */
async function getDataForNextFiveHrs(cityName) {
  let CityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);

  //const getUrl = "https://soliton.glitch.me?city="+CityName;
  const getUrl = `http://${hostname}:${port}/cityname?city=${CityName}`;
  //const postUrl = "https://soliton.glitch.me/hourly-forecast";
  const postUrl = `http://${hostname}:${port}/hourlyforecast`;
  let bodyData = {};
  const nextFiveHrs = new Promise((resolve, reject) => {
    fetch(getUrl)
      .then((response) => {
        if (response.status >= 400) {
          throw response;
        }
        return response.json();
      })
      .then((data) => {
        bodyData = data;
        bodyData.hours = 4;
        bodyData = JSON.stringify(bodyData);
        fetch(postUrl, {
          method: "POST",
          headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "Content-Type": "application/json",
          },
          body: bodyData,
        })
          .then((response) => {
            if (response.status >= 400) {
              throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            resolve(data);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
  return nextFiveHrs;
}

/**
 *  @export {function}
 */
export { getDataForNextFiveHrs, getData };
