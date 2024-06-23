document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherDataByCity(city);
        fetchForecastDataByCity(city);
        fetchHistoricalDataByCity(city);
    } else {
        alert('Please enter a city name.');
    }
});

document.getElementById('location-button').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherDataByCoordinates(lat, lon);
            fetchForecastDataByCoordinates(lat, lon);
            fetchHistoricalDataByCoordinates(lat, lon);
        }, error => {
            alert('Error fetching location. Please try again.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

const apiKey = process.env.OPEN_WEATHER_MAP_KEY;

let forecastChart;
let historicalChart;

function fetchWeatherDataByCity(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeatherData(data);
                fetchWeatherAlerts(data.coord.lat, data.coord.lon);
            } else {
                alert('City not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function fetchWeatherDataByCoordinates(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeatherData(data);
                fetchWeatherAlerts(lat, lon);
            } else {
                alert('Location not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function fetchForecastDataByCity(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
                displayForecastData(data);
            } else {
                alert('City not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}

function fetchForecastDataByCoordinates(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
                displayForecastData(data);
            } else {
                alert('Location not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}

function fetchHistoricalDataByCity(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall/timemachine?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayHistoricalData(data);
            } else {
                alert('City not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching historical data:', error);
        });
}

function fetchHistoricalDataByCoordinates(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayHistoricalData(data);
            } else {
                alert('Location not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching historical data:', error);
        });
}

function fetchWeatherAlerts(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/alerts?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeatherAlerts(data);
        })
        .catch(error => {
            console.error('Error fetching weather alerts:', error);
        });
}

function displayWeatherData(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById('weather-description').textContent = `Description: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('sunrise').textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
    document.getElementById('sunset').textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById('weather-info').style.display = 'block';

    // Change background image based on weather description
    changeBackgroundImage(data.weather[0].description);
}

function displayForecastData(data) {
    const ctx = document.getElementById('forecast-chart').getContext('2d');
    const labels = data.list.map(item => new Date(item.dt * 1000).toLocaleDateString());
    const temperatures = data.list.map(item => item.main.temp);

    if (forecastChart) {
        forecastChart.destroy();
    }

    forecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    document.getElementById('forecast-info').style.display = 'block';
}

function displayHistoricalData(data) {
    const ctx = document.getElementById('historical-chart').getContext('2d');
    const labels = data.hourly.map(item => new Date(item.dt * 1000).toLocaleTimeString());
    const temperatures = data.hourly.map(item => item.temp);

    if (historicalChart) {
        historicalChart.destroy();
    }

    historicalChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    document.getElementById('historical-info').style.display = 'block';
}

function displayWeatherAlerts(data) {
    const alertMessage = data.alerts ? data.alerts[0].description : 'No alerts for this location.';
    document.getElementById('alert-message').textContent = alertMessage;
    document.getElementById('alert-info').style.display = 'block';
}

function changeBackgroundImage(description) {
    let imageUrl = '';
    if (description.includes('rain')) {
        imageUrl = 'url(https://source.unsplash.com/1600x900/?rain)';
    } else if (description.includes('cloud')) {
        imageUrl = 'url(https://source.unsplash.com/1600x900/?cloud)';
    } else if (description.includes('clear')) {
        imageUrl = 'url(https://source.unsplash.com/1600x900/?clear-sky)';
    } else {
        imageUrl = 'url(https://source.unsplash.com/1600x900/?weather)';
    }
    document.body.style.backgroundImage = imageUrl;
}
