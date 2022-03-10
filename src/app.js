function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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

function coordDay(dt) {
  let date = new Date(dt * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastResult = response.data.daily;
  let forecast = document.querySelector("#fore-cast");

  let forecastHTML = `<div class="row">`;

  forecastResult.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-day-temp-body">
        <div class="weather-forecast-day">${coordDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" 
        width="30" />
        <div class="weather-forecast-temps">
          <span class="weather-forecast-max-temp">${Math.round(
            forecastDay.temp.max
          )}º</span>
          <span class="weather-forecast-min-temp"> ${Math.round(
            forecastDay.temp.min
          )}º </span>
        </div>
      </div>
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `ae2ec4b5c918b23f97601cbc84d57ecd`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = `Wind speed:
  ${Math.round(response.data.wind.speed)} m/s`;
  document.querySelector("#day-time").innerHTML = formatDate(
    response.data.dt * 1000
  );

  celciusTemperature = response.data.main.temp;

  let icons = response.data.weather[0].icon;
  let imgElement = document.querySelector("img");
  imgElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icons}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = `ae2ec4b5c918b23f97601cbc84d57ecd`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city-search");
  search(searchInputElement.value);
}

search("Hamilton, Ontario");

let entryForm = document.querySelector("#entry-form");
entryForm.addEventListener("submit", handleSubmit);
