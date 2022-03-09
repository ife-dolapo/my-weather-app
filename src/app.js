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

function displayForecast() {
  let forecast = document.querySelector("#fore-cast");

  let forecastHTML = `<div class="row">`;
  let days = [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <div class="weather-forecast-day-temp-body">
        <div class="weather-forecast-day">${day}</div>
        <img src="src/weatherapp.png" alt="" width="30" />
        <div class="weather-forecast-temps">
          <span class="weather-forecast-max-temp">-3º</span>
          <span class="weather-forecast-min-temp"> 3º </span>
        </div>
      </div>
    </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
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
displayForecast();

let entryForm = document.querySelector("#entry-form");
entryForm.addEventListener("submit", handleSubmit);

//fahrenheit conversion
function getFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function getCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", getFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", getCelciusTemperature);
