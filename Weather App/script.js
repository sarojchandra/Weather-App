const inputBox = document.querySelector("#inputBox");
let button = document.querySelector(".btn");
let tempreture = document.querySelector(".tempreture");
let windSpeed = document.querySelector("#wind-speed");
let humidity = document.querySelector("#humidity");
let description = document.querySelector(".description");
let weatherImg = document.querySelector("#weatherImg");
let locationNotFound = document.querySelector(".locationNotFound");
let weatherBody = document.querySelector(".weatherBody");
let cityName = document.querySelector(".cityName");
let dateTime = document.querySelector(".dateTime");
let feels = document.querySelector(".feel");
let sunrise = document.querySelector(".sunrise");
let sunset = document.querySelector(".sunset");
let container = document.querySelector(".container");

inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkWeather(inputBox.value);
});

async function checkWeather(city) {
  try {
    const api_key = "a393912ed2730cb78fa23dd9fae371f8";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    let response = await fetch(`${url}`);
    let data = await response.json();

    if (data.cod === "404" || inputBox.value === "") {
      locationNotFound.style.display = "flex";
      weatherBody.style.display = "none";
    } else {
      weatherBody.style.display = "flex";
      locationNotFound.style.display = "none";
      tempreture.innerHTML = `${Math.round(
        data.main.temp - 273.15
      )} <span><sup>°C</sup><span>`;
      windSpeed.innerHTML = `${data.wind.speed}km/h`;
      humidity.innerHTML = `${data.main.humidity}% <p>Humidity</p>`;
      description.innerHTML = `${data.weather[0].description}`;
      cityName.innerHTML = `${data.name},${data.sys.country}`;
      feels.innerHTML = `<p>Feels Like : </p> ${Math.round(
        data.main.feels_like - 273.15
      )} <span><sup>°C</sup><span>`;
      dateTime.textContent = getCurrentDate();
      sunrise.innerHTML = new Date(data.sys.sunrise * 1000).toLocaleString(
        "en-IN",
        { hour: "2-digit", minute: "2-digit" }
      );
      sunset.innerHTML = new Date(data.sys.sunset * 1000).toLocaleString(
        "en-IN",
        { hour: "2-digit", minute: "2-digit" }
      );
    }
    let weather = data.weather[0].main;

    switch (weather) {
      case "Clouds":
        container.style.backgroundImage = "url('images/claudybg.webp')";
        container.style.backgroundSize = "cover";
        container.style.color = " #222";
        weatherImg.src = "images/cloud.png";
        break;
      case "Clear":
        container.style.backgroundImage = "url('images/clearbg.webp')";
        container.style.backgroundSize = "cover";
        container.style.color = " #222";
        weatherImg.src = "images/clear.png";
        break;
      case "Rain":
        container.style.backgroundImage = "url('images/rainy bg.jpg')";
        container.style.backgroundSize = "cover";
        container.style.color = "#ebfffc";
        weatherImg.src = "images/rain.png";
        break;
      case "Mist":
        weatherImg.src = "images/mist.png";
        container.style.color = " #222";
        break;
      case "Snow":
        weatherImg.src = "images/snow.png";
        container.style.color = " #222";
        break;
      default:
        weatherImg.src = "images/404.png";
        break;
    }
  } catch (error) {
    console.log("something went wrong", error);
  }
}

function getCurrentDate() {
  const currentDate = new Date();
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };
  return currentDate.toLocaleDateString("en-GB", options);
}

button.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
