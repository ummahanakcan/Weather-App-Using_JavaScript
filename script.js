const apiKey = "";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidty").innerHTML = data.main.humidity + "%";
    document.querySelector(".windy").innerHTML = data.wind.speed + " km/h";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

    if (data.weather[0].main == "Rain") {
      weatherIcon.setAttribute("src", "images/rain.png");
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.setAttribute("src", "images/clear.png");
    } else if (data.weather[0].main == "Clouds") {
      weatherIcon.setAttribute("src", "images/clouds.png");
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.setAttribute("src", "images/drizzle.png");
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.setAttribute("src", "images/mist.png");
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.setAttribute("src", "images/snow.png");
    }
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    checkWeather(searchBox.value);
  }
});
