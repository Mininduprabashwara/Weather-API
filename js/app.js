
const APIKEY = "0d260a35bae7c5a83f603d8b622956d1";
const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.getElementById("city");
const searchBtn = document.getElementById("btn");
const message = document.getElementById("message");

// Get weather using live location
async function getLiveWeather(lat, lon) {
    try {
        message.innerHTML = "Getting your live location weather...";

        const response = await fetch(
            `${URL}&lat=${lat}&lon=${lon}&appid=${APIKEY}`
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error("Unable to get weather");
        }
        displayWeather(data);
        message.innerHTML = "Live location weather updated";
    } catch (error) {
        message.innerHTML = "Weather data could not be loaded.";
    }
}

// Get current location
function getLocation() {
    if (!navigator.geolocation) {
        message.innerHTML = "Your browser does not support location.";
        return;
    }

    message.innerHTML = "Finding your location...";

    navigator.geolocation.getCurrentPosition(
        function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            getLiveWeather(lat, lon);
        },
        function (error) {
            if (error.code === 1) {
                message.innerHTML =
                    "Please allow location access.";
            } else {
                message.innerHTML =
                    "Location unavailable. Please try again.";
            }
        },
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 15000
        }
    );
}

// Search weather by city name
async function checkWeather(city) {
    city = city.trim();

    if (city === "") {
        message.innerHTML = "Please enter a city name.";
        return;
    }

    try {
        message.innerHTML = "Searching...";

        const response = await fetch(
            `${URL}&q=${encodeURIComponent(city)}&appid=${APIKEY}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error("City not found!");
        }

        displayWeather(data);
        message.innerHTML = "Weather updated.";

    } catch (error) {
        message.innerHTML = "City not found. Please try again.";
    }
}

// Display weather details
function displayWeather(data) {

    // City name
    document.querySelector(".city").textContent = data.name;

    // Temperature
    document.querySelector(".temp").textContent =
        Math.round(data.main.temp) + "°C";

    // Feels Like
    document.querySelector(".feels-like").textContent =
        Math.round(data.main.feels_like) + "°C";

    // Humidity
    document.querySelector(".humidity").textContent =
        data.main.humidity + "%";

    // Wind Speed
    document.querySelector(".wind").textContent =
        (data.wind.speed * 3.6).toFixed(1) + " km/h";

    // Weather description
    document.querySelector(".description").textContent =
        data.weather[0].description;

    // Weather icon
    document.querySelector(".weather-icon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

// Search button
searchBtn.addEventListener("click", function () {
    checkWeather(searchBox.value);
});

// Search using Enter key
searchBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

getLocation();
