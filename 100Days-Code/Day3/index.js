// Create a Node.js script that interacts with a public API to fetch weather data for a specific city. You can use the OpenWeatherMap API (https://openweathermap.org/api) or any other weather API of your choice. Your script should take a city name as input, make a request to the API, and display the current weather conditions (e.g., temperature, humidity, weather description) for that city.

const axios = require('axios');


const API_KEY = "e20ef824ca07d082e00b76746ec9a402";
const city = "Gandhinagar";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

const weather = async () => {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let weatherData = await response.json();
        console.log("Temperature:", weatherData.main.temp + "°C");
        console.log("Humidity:", weatherData.main.humidity + "%");
        console.log("Description:", weatherData.weather[0].description);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

// ----Axios Use-------

// const weather = async () => {
//     try {
//         let response = await axios.get(url);
//         let weatherData = response.data;
//         console.log("Temperature:", weatherData.main.temp + "°C");
//         console.log("Humidity:", weatherData.main.humidity + "%");
//         console.log("Description:", weatherData.weather[0].description);
//     } catch (error) {
//         console.error("Error fetching weather data:", error);
//     }
// };

weather();
