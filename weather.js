let lat, lon;

function success(pos) {
  const crd = pos.coords;
  lat = crd.latitude;
  lon = crd.longitude;
  fetchWeatherData();
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function fetchWeatherData() {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=88DCRTFD8WZZDKLG5QWS8DQV9`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const days = data.days.slice(0, 7);
      const weatherTable = document.getElementById('weather-body');

      days.forEach(day => {
        const row = document.createElement('tr');

        ['datetime', 'temp', 'humidity', 'conditions'].forEach(prop => {
          const cell = document.createElement('td');
          cell.textContent = day[prop];
          row.appendChild(cell);
        });

        weatherTable.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

navigator.geolocation.getCurrentPosition(success, error, {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
});

document.addEventListener("DONContentLoaded", fetchWeatherData);
