import { cityDetails, cityNames, continents } from "./data.js";
import * as calculate from "./calculate.js";

let citiesNames = cityNames;
let myInterval;
let displayCity;
const temperatureArrow = document.querySelector(".arrow.temperature");
const continentArrow = document.querySelector(".arrow.continent");
const bottomSectionConatiner = document.querySelector(".bottom-grid-container");

/**
 * @description displaying botttom section
 *
 * @param {Array} citiesNames array of cities to be displayed
 */
function containerSection(citiesNames) {
  clearInterval(myInterval);
  displayCity = citiesNames.slice(0, 12);
  bottomSectionConatiner.innerHTML = "";
  displayCity.forEach((name) => {
    let cityInfo = cityDetails[name.toLowerCase()];
    let dateAndTime = new Date().toLocaleString("en-US", {
      timeZone: "" + cityInfo.timeZone,
    });
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
    <div class="bottom-temperature-font">
    ${cityInfo.temperature}
    </div>
    <div>
      <img class="parameter-icon" src="./assets/humidityIcon.svg" />
      <span class="bottom-humidity-font">${cityInfo.humidity}</span>
    </div>
  </div>
</div>
</div>
`;
  });
  myInterval = setInterval(function () {
    elementRepeat();
  }, 60000);
}

/**
 *  @description displaying time continously
 */
function elementRepeat() {
  const countAll = document.querySelectorAll(".bottom-place");
  displayCity.forEach((name) => {
    countAll.forEach((ele, index) => {
      if (name === ele.innerHTML.trim().split(",")[0]) {
        let cityInfo = cityDetails[name.toLowerCase()];
        let dateAndTime = new Date().toLocaleString("en-US", {
          timeZone: "" + cityInfo.timeZone,
        });
        dateAndTime = calculate.calculateDateAndTime(dateAndTime);
        const time = calculate.calculateTime(dateAndTime[1]);
        document.querySelectorAll(".bottom-place")[index].innerHTML = `${
          cityInfo.cityName
        },  ${time[0] + ":" + time[1] + " " + time[3]}`;
      }
    });
  });
}

/**
 * @description changing arrows according clicking sort
 * 
 * @param {HTMLElement} arrow event of arrow action
 */
function arrowchange(arrow) {
  let changeArrow =
    arrow.getAttribute("value") === "continent"
      ? continentArrow
      : temperatureArrow;
  if (arrow.classList.contains("arrowUp")) {
    changeArrow.innerHTML = `&#129123;`;
    arrow.classList.remove("arrowUp");
    arrow.classList.add("arrowDown");
  } else {
    changeArrow.innerHTML = `&#129121;`;
    arrow.classList.remove("arrowDown");
    arrow.classList.add("arrowUp");
  }
}

/**
 *  @description sorting according to continents
 * 
 * @param {string} cityName1 cityname for comparing climate condition
 * @param {string} cityName2 cityname for comparing climate condition
 * @returns true or false
 */
function sortForContinents(cityName1, cityName2) {
  const cityInfo1 = cityDetails[cityName1.toLowerCase()];
  const cityInfo2 = cityDetails[cityName2.toLowerCase()];
  return cityInfo1.continent > cityInfo2.continent
    ? 1
    : cityInfo1.continent < cityInfo2.continent
    ? -1
    : 0;
}

/**
 *  @description sorting according to temperature
 * 
 * @param {*} cityName1 cityname for comparing climate condition
 * @param {*} cityName2 cityname for comparing climate condition
 * @returns true or false
 */
function sortForTemeperature(cityName1, cityName2) {
  const cityInfo1 = cityDetails[cityName1.toLowerCase()];
  const cityInfo2 = cityDetails[cityName2.toLowerCase()];
  let temperature1 = Number(
    cityInfo1.temperature.slice(0, cityInfo1.temperature.length - 2)
  );
  let temperature2 = Number(
    cityInfo2.temperature.slice(0, cityInfo2.temperature.length - 2)
  );
  return temperature1 > temperature2 ? -1 : temperature1 < temperature2 ? 1 : 0;
}

/**
 *  @description sort by tempture after click arrow sort
 */
function sortByTemperature() {
  let totalArray = [];

  for (let i = 0; i < continents.length; i++) {
    let next = [];
    citiesNames.filter((city) => {
      if (cityDetails[city.toLowerCase()].continent === continents[i]) {
        next.push(city);
      }
    });
    if (temperatureArrow.classList.contains("arrowUp")) {
      next.sort(sortForTemeperature).reverse();
    } else {
      next.sort(sortForTemeperature);
    }
    totalArray = totalArray.concat(next);
  }
  citiesNames = totalArray;
}

/**
 * @description action according to change
 * 
 * @param {HTMLElement} event selecting event
 */
function sortBy(event) {
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
  containerSection(citiesNames);
}

/**
 * @description Initialize bottom section
 *
 * @export {function}
 */
export function bottomSectionDisplay() {
  window.sortBy = sortBy;
  temperatureArrow.click();
}
