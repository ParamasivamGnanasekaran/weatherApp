import { cityNames } from "./data.js";
import { updateCurrentCity } from "./cityObject.js";

const inputCity = document.querySelector("#city-name");

let myInterval;

/**
 * 
 * @param {string} inp input words 
 * @param {Array} arr  array of city names
 */
function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;

    closeAllLists();
    currentFocus = -1;

    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");

    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          SelectedCity(inp.value);
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;

      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;

      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;

    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;

    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

/**
 * @description running under setinterval
 *
 * @param {object} cityInfo details of input current city
 */
function timeDisplay(cityInfo) {
  let dateAndTime = new Date().toLocaleString("en-US", {
    timeZone: "" + cityInfo.timeZone,
  });
  dateAndTime = cityInfo.calculateDateAndTime(dateAndTime);
  const hour = document.querySelector("#hour").innerHTML;
  const time = cityInfo.calculateTime(dateAndTime[1]);
  if (time[0] === hour) {
    document.getElementById("hour").innerHTML = time[0];
    document.getElementById("minutes").innerHTML = time[1];
    document.getElementById("secs").innerHTML = time[2];
  } else {
    SelectedCity(cityInfo.name);
  }
}

/**
 * @description displaying next five hours data
 *
 * @param {object} cityInfo details of input current city
 */
function continueDisplay(cityInfo) {
  clearInterval(myInterval);
  let dateAndTime = new Date().toLocaleString("en-US", {
    timeZone: "" + cityInfo.timeZone,
  });
  dateAndTime = cityInfo.calculateDateAndTime(dateAndTime);
  const time = cityInfo.calculateTime(dateAndTime[1]);
  document.getElementById("hour").innerHTML = time[0];
  document.getElementById("minutes").innerHTML = time[1];
  document.getElementById("secs").innerHTML = time[2];
  myInterval = setInterval(function () {
    timeDisplay(cityInfo);
  }, 1000);
  document.getElementById("date").innerHTML = dateAndTime[0].getDate();
  document.getElementById("month").innerHTML = cityInfo.calculateMonth(
    dateAndTime[0].getMonth()
  );
  document.getElementById("year").innerHTML = dateAndTime[0].getFullYear();
  if (time[3] === "AM") {
    document.getElementById("stateImg").src = "assets/amState.svg";
  } else if (time[3] === "PM") {
    document.getElementById("stateImg").src = "assets/pmState.svg";
  }

  document.getElementById("city-image").src =
    "assets/HTML_&_CSS/Icons_for_cities/" + cityInfo.name + ".svg";
  document.getElementById("weather-temperature-now").innerHTML =
    cityInfo.temperature.split(" ").join("");
  document.getElementById("weather-icon-now").src =
    "assets/HTML_&_CSS/Weather_Icons/" +
    cityInfo.selectIcon(cityInfo.temperature) +
    ".svg";

  let counter = 1;
  for (let i = 0; i < cityInfo.nextFiveHrs.length; i++) {
    document.getElementById("weather-icon-" + i).src =
      "assets/HTML_&_CSS/Weather_Icons/" +
      cityInfo.selectIcon(cityInfo.nextFiveHrs[i]) +
      ".svg";
    document.getElementById("weather-temperature-" + i).innerHTML =
      cityInfo.nextFiveHrs[i].split(" ").join("");
    if (time[3] === "AM") {
      if (Number(time[0]) + i + 1 < 12) {
        document.getElementById("weather-time-" + i).innerHTML =
          Number(time[0]) + i + 1 + time[3];
      } else if (Number(time[0]) + i + 1 === 12) {
        document.getElementById("weather-time-" + i).innerHTML =
          Number(time[0]) + i + 1 + "PM";
      } else {
        document.getElementById("weather-time-" + i).innerHTML = counter + "PM";
        counter++;
      }
    } else if (time[3] === "PM") {
      if (Number(time[0]) + i + 1 < 12) {
        document.getElementById("weather-time-" + i).innerHTML =
          Number(time[0]) + i + 1 + time[3];
      } else if (Number(time[0]) + i + 1 === 12) {
        document.getElementById("weather-time-" + i).innerHTML =
          Number(time[0]) + i + 1 + "AM";
      } else {
        document.getElementById("weather-time-" + i).innerHTML = counter + "AM";
        counter++;
      }
    }
  }
}

/**
 * @description displays data in top section according selection of city in input field
 *
 * @param {string} currentCity input city name
 */
async function SelectedCity(currentCity) {
  const cityInfo = updateCurrentCity(currentCity);
  await cityInfo.nextFiveHrss(currentCity);
  document.getElementById("precipitation").innerHTML = cityInfo.precipitation;
  document.getElementById("temperatureC").innerHTML = cityInfo.temperature;
  const tempF = cityInfo.calculateF(cityInfo.temperature);
  document.getElementById("temperatureF").innerHTML = tempF;
  document.getElementById("humidity").innerHTML = cityInfo.humidity;
  continueDisplay(cityInfo);
}

/**
 * @description Initialize top section
 *
 * @export {function}
 */
export function topSectionDisplay() {
  autocomplete(inputCity, cityNames);
  SelectedCity(inputCity.value);
}
