async function fetchWeatherData() {
    const lat = 32.8801;
    const lon = -117.2340;

    try {
        // Construct the URL with the correct format
        const url = `https://api.weather.gov/points/${lat},${lon}`;
        console.log(url);

        // Fetch gridpoint URL
        let response = await fetch(url);
        const data = await response.json();

        if (data.properties) {
            const forecastUrl = data.properties.forecast;

            // Fetch weather data from gridpoint URL
            response = await fetch(forecastUrl);
            const weatherData = await response.json();

            // Display weather data
            if (weatherData.properties && weatherData.properties.periods) {
                displayWeather(weatherData.properties.periods[0]);
            } else {
                console.error('Weather data format error');
            }
        } else {
            console.error('Gridpoint data format error');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

const weatherIcons = {
    "Clear": "&#9728;", // Unicode for Sun
    "Sunny": "&#9728;", // Unicode for Sun
    "Mostly Clear": "&#127780;", // Unicode for Sun Behind Small Cloud
    "Mostly Sunny": "&#127780;", // Unicode for Sun Behind Small Cloud
    "Partly Cloudy": "&#127780;", // Unicode for Sun Behind Cloud
    "Partly Sunny": "&#127780;", // Unicode for Sun Behind Cloud
    "Mostly Cloudy": "&#127780;", // Unicode for Sun Behind Large Cloud
    "Cloudy": "&#9729;" // Unicode for Cloud
};

function getWeatherIcon(condition) {
    // Split the condition string at '/'
    let conditions = condition.split('/').map(cond => cond.trim());
}


function displayWeather(weather) {
    console.log(weather);
    const weatherContainer = document.getElementById('weather-widget');
    const temperature = weather.temperature;
    const conditions = weather.shortForecast;
    const icon = weatherIcons[conditions];
    const windSpeed = weather.windSpeed;
    const humidity = weather.relativeHumidity.value; // Assuming this data is available

    weatherContainer.innerHTML = `
        <div class="weather-location">▼La Jolla, California</div>
        <div class="weather-condition">${conditions}</div>
        <div class="weather-temp">${temperature}°F</div>
        <div class="weather-icon">${icon}</div>
        <div class="weather-wind">Wind: ${windSpeed}</div>
        <div class="weather-humidity">Humidity: ${humidity}%</div>
    `;
}
// Call the function when the document is loaded
document.addEventListener('DOMContentLoaded', fetchWeatherData);