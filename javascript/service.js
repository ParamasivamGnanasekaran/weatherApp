//import { cityDetails } from "./data";


//const url = "https://soliton.glitch.me/all-timezone-cities";
const url = "http://localhost:3000/allcity";
function modifydata(data){
    let cityData=[];
    data.forEach(element => {
       cityData[element.cityName.toLowerCase()] = element;
        cityData.concat(cityData);
    });
   return cityData;
  }
  

async function getData(){
    let cityDetails= new Promise((resolve, reject) => {  
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
    })
    return cityDetails;
}


async function getDataForNextFiveHrs(cityName){
   let CityName = cityName.charAt(0).toUpperCase()+cityName.slice(1);

    //const getUrl = "https://soliton.glitch.me?city="+CityName;
    const getUrl = "http://localhost:3000/cityname?city="+CityName;
    //const postUrl = "https://soliton.glitch.me/hourly-forecast";
    const postUrl = "http://localhost:3000/hourlyforecast";
    let bodyData={};
   const nextFiveHrs = new Promise((resolve, reject) => {
        fetch(getUrl)
        .then((response) => {
            if (response.status >= 400) {
              throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
          })
        .then((data) => {
            bodyData = data;
            bodyData.hours = 4;
            bodyData = JSON.stringify(bodyData);
            fetch(postUrl,{
                method: 'POST', 
                headers: {
                //  'Content-Type': 'application/x-www-form-urlencoded',
                  'Content-Type': 'application/json',
                },
                body: bodyData 
              })
            .then((response) => {
                if (response.status >= 400) {
               throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json(); 
              })
            .then((data) => {
                  resolve(data);
              })
      })
      .catch((error) => {
     
        reject(error);
      });
    });
   return nextFiveHrs;
}


export { getDataForNextFiveHrs, getData };