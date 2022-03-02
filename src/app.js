function displayTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
}

let apiKey = `ae2ec4b5c918b23f97601cbc84d57ecd`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Hamilton&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
