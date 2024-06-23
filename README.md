### Skycast

Skycast is a weather information website that provides detailed local weather forecasts. It utilizes the OpenWeatherMap API to fetch real-time and historical weather data. Below are details regarding the technologies used, key features, and instructions for usage.

#### Technologies Used

- **HTML**: Website structure.
- **CSS**: Styling and responsiveness.
- **JavaScript**: Interaction logic and data manipulation.
- **Chart.js**: Library for interactive chart creation.
- **OpenWeatherMap API**: Primary source for weather data.
- **Unsplash API**: Used for background images based on weather conditions.

#### Features

1. **City Search**:
   - Allows users to search for weather information by entering the city name.

2. **Current Location**:
   - Option to use the user's geolocation to automatically fetch weather data.

3. **Weather Information**:
   - Displays current temperature, weather description, humidity, wind speed, sunrise and sunset times, and a weather icon.

4. **Forecast for Next Days**:
   - Shows a temperature forecast chart for the upcoming days using Chart.js.

5. **Weather Alerts**:
   - Provides specific weather alerts for the searched or current location.

6. **Historical Weather Data**:
   - Presents a temperature variation chart for the past hours or days.

7. **Weather Maps**:
   - Includes an interactive map for weather data visualization.

#### How to Use

1. Clone the Skycast repository.
2. Open the `index.html` file in your web browser.
3. Enter the desired city name in the search input and click "Search", or use the "Use my location" button for automatic data fetching.
4. Explore different sections to view detailed weather information, forecasts, alerts, and historical data.

#### Additional Notes

- Ensure you have a valid OpenWeatherMap API key set in the environment variable `process.env.OPEN_WEATHER_MAP_KEY`.
- The website is responsive and designed to work well on both mobile and desktop devices.


#### License
- The project is under license from MIT. You can access it [here](https://github.com/lnpotter/Skycast/blob/master/LICENSE)
