import { getData } from "./service.js";

const cityDetails = await getData();

let continents = [];
let cityNames = [];
let i = 0;
for (const city in cityDetails) {
  cityNames[i] = cityDetails[city].cityName;
  cityDetails[city.toLowerCase()].continent = cityDetails[
    city.toLowerCase()
  ].timeZone
    .split("/")[0]
    .toLowerCase();
  continents[i] = cityDetails[city.toLowerCase()].timeZone
    .split("/")[0]
    .toLowerCase();
  i++;
}

const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};
cityNames.sort();
continents = continents.filter(unique).sort();
/**
 *  @export {function}
 */
export { cityNames, cityDetails, continents };
