function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    hours = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#day-time").innerHTML = formatDate(
    response.data.dt * 1000
  );
}

function showCityName(event) {
  event.preventDefault();
  let cityTemperatureResult = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(cityTemperatureResult).then(displayTemperature);
}

let apiKey = `ae2ec4b5c918b23f97601cbc84d57ecd`;
let city = document.querySelector("#citysearch").value;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

let cityNameResult = document.querySelector("#citybutton");
cityNameResult.addEventListener("click", showCityName);
