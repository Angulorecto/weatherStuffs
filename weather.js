let lat, lon;

function success(pos) {
  const crd = pos.coords;
  lat = crd.latitude;
  lon = crd.longitude;
  fetchWeatherData();
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  promptForManualLocation();
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

      const timeCard = document.getElementsByClassName('glassy-div')[0];
      timeCard.innerHTML = ''; // Clear any existing content

      shortDesc = periods[0].shortForecast;

      periods.forEach(period => {
        const startTimeCell = document.createElement('div');
        startTimeCell.className = "timeSlot";

        const dateCell = document.createElement('div');
        dateCell.textContent = reformatDate(period.startTime);
        const tempCell = document.createElement('div');
        tempCell.textContent = `${period.temperature}°${period.temperatureUnit}`;
        const humidityCell = document.createElement('div');
        humidityCell.textContent = `${period.relativeHumidity.value}%`;

        startTimeCell.appendChild(dateCell);
        startTimeCell.appendChild(tempCell);
        startTimeCell.appendChild(humidityCell);

        timeCard.appendChild(startTimeCell);
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

function promptForManualLocation() {
  const manualLocationPrompt = document.getElementById('manual-location-prompt');
  manualLocationPrompt.style.display = 'block';
}

function reformatDate(dateString) {
  // Parse the date string
  let date = new Date(dateString);

  // Extract the components
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  let day = date.getDate().toString().padStart(2, '0');
  let year = date.getFullYear();
  let hours = date.getHours() % 12 || 12; // Convert to 12-hour format
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let ampm = date.getHours() >= 12 ? 'PM' : 'AM';

  // Construct the formatted date string
  let formattedDate = `${hours}:${minutes} ${ampm}`;

  return formattedDate;
}

function getUserLocalTime() {
  let now = new Date();

  // Extract the components
  let hours = now.getHours() % 12 || 12; // Convert to 12-hour format
  let minutes = now.getMinutes().toString().padStart(2, '0');
  let ampm = now.getHours() >= 12 ? 'PM' : 'AM';

  // Construct the formatted time string
  let formattedTime = `${hours}:${minutes} ${ampm}`;

  return formattedTime;
}


document.addEventListener('DOMContentLoaded', () => {
  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  });
  console.log(getUserLocalTime());
});
