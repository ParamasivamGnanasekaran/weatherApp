import { cityDetails, cityNames } from "./data.js";
import * as calculate from "./calculate.js";

let citiesNames = cityNames;
let cityArray;
let myInterval;
let word;
let displayCity;
const middleSection = document.getElementById("scroll-cities");
const selectionId = document.querySelectorAll("#weather-icon");
const displayCount = document.querySelector("#dispaly-count");
const pre = document.querySelector("#pre");
const next = document.querySelector("#next");

/**
 * @description dispaly HTML content for selected climate 
 * 
 * @param {array} filterCitiesNames fitler city names according to selection climate
 * @param {number} displayValue number cities to display
 */
function detailSection(filterCitiesNames, displayValue) {
  clearInterval(myInterval);
  displayCity = filterCitiesNames.slice(0, displayValue);
  middleSection.innerHTML = "";
  displayCity.forEach((name) => {
    let cityInfo = cityDetails[name.toLowerCase()];
    let dateAndTime = new Date().toLocaleString("en-US", {
      timeZone: "" + cityInfo.timeZone,
    });
    dateAndTime = calculate.calculateDateAndTime(dateAndTime);
    const time = calculate.calculateTime(dateAndTime[1]);
    const htmlElement = `
        <div class="scroll-cities-sections" style="background-image:${
          "url('assets/HTML_&_CSS/Icons_for_cities/" +
          name.toLowerCase() +
          ".svg')"
        }">
        <div class="city-values">
          <div class="city-parameter-values">
            <div id="middle-place">
            ${cityInfo.cityName}
            </div>
            <div id="middle-time">
            ${time[0] + ":" + time[1] + " " + time[3]}
            </div>
            <div id="middle-date">
            ${
              dateAndTime[0].getDate() +
              " " +
              calculate.calculateMonth(dateAndTime[0].getMonth()) +
              " " +
              dateAndTime[0].getFullYear()
            }
            </div>
            <div>
              <img class="parameter-icon" src="./assets/humidityIcon.svg" />
              <span id="middle-humidity">${cityInfo.humidity}</span>
            </div>
            <div>
              <img class="parameter-icon" src="./assets/precipitationIcon.svg" />
              <span id="middle-precipitation">${cityInfo.precipitation}</span>
            </div>
          </div>
          <div class="temperature-icon">
            <div><img class="weather-icons" src="./assets/${word}Icon.svg" /></div>
            <div id="middle-temperature">${cityInfo.temperature}</div>
          </div>
        </div>
      </div>`;

    middleSection.innerHTML += htmlElement;
  });
  myInterval = setInterval(function () {
    elementRepeat();
  }, 60000);
}

/**
 * @description gets count for dispaly section
 */
function citiescount() {
  let value = this.value;
  detailSection(cityArray, value, word);
  displayCountArrow(value);
}

/**
 * @description displays next and pre arrows
 * 
 * @param {number} value number of displaying cities 
 */
function displayCountArrow(value) {
  if (value == 3) {
    pre.classList.add("disable");
    next.classList.add("disable");
  } else {
    pre.classList.remove("disable");
    next.classList.remove("disable");
  }
}

/**
 * @description styling selected climate
 * 
 * @param {string} word arttibutes of selected element
 */
function tabIdChange(word) {
  selectionId.forEach((element) => {
    if (element.classList.contains(word)) {
      element.classList.add("selected");
    } else {
      element.classList.remove("selected");
    }
  });
}

/**
 * @description displays next and pre arrows
 * 
 * @param {string} city city name 
 * @returns true or false according to selected climate
 */
function filterArray(city) {
  let cityInfo = cityDetails[city.toLowerCase()];
  let temperature = Number(
    cityInfo.temperature.slice(0, cityInfo.temperature.length - 2)
  );
  let humidity = Number(
    cityInfo.humidity.slice(0, cityInfo.humidity.length - 1)
  );
  let precipitation = Number(
    cityInfo.precipitation.slice(0, cityInfo.precipitation.length - 1)
  );

  if (this.word === "sunny") {
    return temperature > 29 && humidity < 50 && precipitation >= 50;
  } else if (this.word === "snowflake") {
    return (
      temperature >= 20 &&
      temperature <= 28 &&
      humidity > 50 &&
      precipitation < 50
    );
  } else if (this.word === "rainy") {
    return temperature < 20 && humidity >= 50 && precipitation < 50;
  } else {
    return false;
  }
}

/**
 * @description moving card displays by clicking pre and next
 * 
 * @param {HTMLElement} event action of button 
 */
function moveScrollBar(event) {
  const movement = event.srcElement.getAttribute("movement");
  let movedArea;
  if (movement === "forward") {
    movedArea = -200;
  } else {
    movedArea = 200;
  }
  middleSection.scrollBy(movedArea, 0);
}

/**
 * @description comparing cities according to selected climate
 * 
 * @param {string} cityName1 cityname for comparing climate condition
 * @param {string} cityName2 cityname for comparing climate condition
 * @returns
 */
function sortCities(cityName1, cityName2) {
  const cityInfo1 = cityDetails[cityName1.toLowerCase()];
  const cityInfo2 = cityDetails[cityName2.toLowerCase()];

  if (this.word === "sunny") {
    let temperature1 = Number(
      cityInfo1.temperature.slice(0, cityInfo1.temperature.length - 2)
    );
    let temperature2 = Number(
      cityInfo2.temperature.slice(0, cityInfo2.temperature.length - 2)
    );
    return temperature1 > temperature2
      ? -1
      : temperature1 < temperature2
      ? 1
      : 0;
  }

  if (this.word == "snowflake") {
    let precipitation1 = Number(
      cityInfo1.precipitation.slice(0, cityInfo1.precipitation.length - 2)
    );
    let precipitation2 = Number(
      cityInfo2.precipitation.slice(0, cityInfo2.precipitation.length - 2)
    );
    return precipitation1 > precipitation2
      ? -1
      : precipitation1 < precipitation2
      ? 1
      : 0;
  }

  if (this.word === "rainy") {
    let humidity1 = Number(
      cityInfo1.humidity.slice(0, cityInfo1.humidity.length - 2)
    );
    let humidity2 = Number(
      cityInfo2.humidity.slice(0, cityInfo2.humidity.length - 2)
    );
    return humidity1 > humidity2 ? -1 : humidity1 < humidity2 ? 1 : 0;
  }
  return 0;
}

/**
 * @description displaying HTML element content
 */
function elementRepeat() {
  const countAll = document.querySelectorAll("#middle-place");
  displayCity.forEach((name) => {
    countAll.forEach((ele, index) => {
      if (name === ele.innerHTML.trim()) {
        let cityInfo = cityDetails[name.toLowerCase()];
        let dateAndTime = new Date().toLocaleString("en-US", {
          timeZone: "" + cityInfo.timeZone,
        });
        dateAndTime = calculate.calculateDateAndTime(dateAndTime);
        const time = calculate.calculateTime(dateAndTime[1]);
        document.querySelectorAll("#middle-time")[index].innerHTML = `${
          time[0] + ":" + time[1] + " " + time[3]
        }`;
        document.querySelectorAll("#middle-date")[index].innerHTML = ` ${
          dateAndTime[0].getDate() +
          " " +
          calculate.calculateMonth(dateAndTime[0].getMonth()) +
          " " +
          dateAndTime[0].getFullYear()
        }`;
      }
    });
  });
}

/**
 * @description display a cities 
 * 
 * @param {HTMLElement} e selected icon as climate
 */
function SelectedClimate(e) {
  word = e.srcElement.getAttribute("word").toLowerCase();
  tabIdChange(word);
  let filterCitiesNames;
  let wordBind = { word: word };
  filterCitiesNames = citiesNames.filter(filterArray.bind(wordBind));
  filterCitiesNames.sort(sortCities.bind(wordBind));
  cityArray = filterCitiesNames;
  detailSection(filterCitiesNames, displayCount.value, word);
}

/**
 * @description Initialize middle section
 *
 * @export {function}
 */
export function middleSectionDisplay() {
  window.citiescount = citiescount.bind(displayCount);
  window.moveScrollBar = moveScrollBar;
  window.selectedClimate = SelectedClimate;
  document.querySelector(".sunny").click();
}
