import { cityDetails, cityNames, continents } from "./data.js";
import * as calculate from "./calculate.js";

let citiesNames = cityNames;
let myInterval;
const temperatureArrow = document.querySelector(".arrow.temperature");
const continentArrow = document.querySelector(".arrow.continent");
const bottomSectionConatiner = document.querySelector(".bottom-grid-container");

function containerSection(citiesNames) {
    let displayCity = citiesNames.slice(0, 12);
    bottomSectionConatiner.innerHTML = "";
    displayCity.forEach((name) => {
        let cityInfo = cityDetails[name.toLowerCase()];
        let dateAndTime = new Date().toLocaleString("en-US", { timeZone: "" + cityInfo.timeZone });
        dateAndTime = calculate.calculateDateAndTime(dateAndTime);
        const time = calculate.calculateTime(dateAndTime[1]);
        bottomSectionConatiner.innerHTML += ` <div class="bottom-grid-section">
<div class="bottom-grid-flex">
  <div class="bottom-place-temp">
    <div class="bottom-continent">
    ${cityInfo.continent.charAt(0).toUpperCase() + cityInfo.continent.slice(1)}
    </div>
    <div class="bottom-place">
    ${cityInfo.cityName},  ${time[0] + ":" + time[1] + " " + time[3]}
    </div>
  </div>
  <div class="bottom-place-temp">
    <div>
    ${cityInfo.temperature}
    </div>
    <div>
      <img class="parameter-icon" src="./assets/humidityIcon.svg" />
      <span>${cityInfo.humidity}</span>
    </div>
  </div>
</div>
</div>
`
    });
}

function arrowchange(arrow) {
    let changeArrow = arrow.getAttribute("value") === "continent" ? continentArrow : temperatureArrow;
    if (arrow.classList.contains("arrowUp")) {
        changeArrow.innerHTML =`&#129123;`
        arrow.classList.remove("arrowUp");
        arrow.classList.add("arrowDown")
    } else {
        changeArrow.innerHTML = `&#129121;` 
        arrow.classList.remove("arrowDown");
        arrow.classList.add("arrowUp")
    }
}

function sortForContinents(cityName1, cityName2) {
    const cityInfo1 = cityDetails[cityName1.toLowerCase()];
    const cityInfo2 = cityDetails[cityName2.toLowerCase()];
    return cityInfo1.continent > cityInfo2.continent ? 1 : cityInfo1.continent < cityInfo2.continent ? -1 : 0;
}

function sortForTemeperature(cityName1, cityName2) {
    const cityInfo1 = cityDetails[cityName1.toLowerCase()];
    const cityInfo2 = cityDetails[cityName2.toLowerCase()];
    let temperature1 = Number(cityInfo1.temperature.slice(0, cityInfo1.temperature.length - 2));
    let temperature2 = Number(cityInfo2.temperature.slice(0, cityInfo2.temperature.length - 2));
    return temperature1 > temperature2 ? -1 : temperature1 < temperature2 ? 1 : 0;
}

function sortByTemperature() {
    let totalArray = [];

    for (let i = 0; i < continents.length; i++) {
        let next = [];
        citiesNames.filter((city) => {
            if (cityDetails[city.toLowerCase()].continent === continents[i]) {
                next.push(city);
            }
        })
        if (temperatureArrow.classList.contains("arrowUp")) {
            next.sort(sortForTemeperature).reverse(); 
        
        } else {
            next.sort(sortForTemeperature);  
        }
        totalArray = totalArray.concat(next);
    }
    citiesNames = totalArray;
}


function sortBy(event) {
    clearInterval(myInterval);
    const value = event.srcElement.getAttribute("value");

    if (value === "continent") {
        if (event.srcElement.classList.contains("arrowUp")) {
             citiesNames.sort(sortForContinents).reverse();
        } else {
            citiesNames.sort(sortForContinents);     
        }
        continents.reverse();
    }
    arrowchange(event.srcElement);
    sortByTemperature();
    myInterval = setInterval(function () { containerSection(citiesNames); }, 100);
}

/**
 * 
 */
export function bottomSectionDisplay() {

    window.sortBy = sortBy;

   // continentArrow.click();
    temperatureArrow.click();
}