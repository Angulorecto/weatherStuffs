let lat, lon;

function success(pos) {
  const crd = pos.coords;
  lat = crd.latitude;
  lon = crd.longitude;
  fetchWeatherData();
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  promptForLocation();
}

function fetchWeatherData() {
  const url = `https://api.weather.gov/points/${lat},${lon}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const forecastHourlyUrl = data.properties.forecastHourly;

      fetchForecastHourly(forecastHourlyUrl);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

function fetchForecastHourly(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const periods = data.properties.periods.slice(0, 10);

      const hourlyTable = document.getElementById('hourly-forecast');

      periods.forEach(period => {
        const row = document.createElement('tr');

        const startTimeCell = document.createElement('td');
        startTimeCell.textContent = period.startTime;
        row.appendChild(startTimeCell);

        const tempCell = document.createElement('td');
        tempCell.textContent = period.temperature + ' ' + period.temperatureUnit;
        row.appendChild(tempCell);

        const humidityCell = document.createElement('td');
        humidityCell.textContent = period.relativeHumidity.value + '%';
        row.appendChild(humidityCell);

        const conditionsCell = document.createElement('td');
        conditionsCell.textContent = period.shortForecast;
        row.appendChild(conditionsCell);

        hourlyTable.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching forecastHourly data:', error);
    });
}

function promptForLocation() {
  const locationPrompt = document.getElementById('location-prompt');
  const enableButton = document.getElementById('enable-button');

  enableButton.addEventListener('click', () => {
    locationPrompt.style.display = 'none';
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  });

  locationPrompt.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  });
});
