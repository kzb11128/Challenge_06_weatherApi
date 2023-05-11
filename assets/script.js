var cityInput = document.querySelector('#cityInput');
var savedCityBtn = document.querySelector('#city-buttons');
var searchBtn = document.querySelector('#searchBtn');
var searchBarContainer = document.querySelector('#searchBarContainer')

document.getElementById("weatherContainer").style.display="none"

// Get today's date from day.js
var today = dayjs().format("M/D/YYYY");



// Function to get weather information 
function getWeather(city) {
  // Grab the city name from city input and concatenate with today's date
  document.getElementById("currentCityDate").innerHTML = city + " " + "(" + today + ")";

  // Get current temperature, wind speed and humidity for the city input from OpenWeatherMap API
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&appid=7f33fc68da77ae927d774bda8401789c')
    .then(response => response.json())
    .then(data => {
      document.getElementById("today" + "Temp").innerHTML = "Current Temp: " + Number(data.main.temp).toFixed()+ "°F";
      document.getElementById("today" + "Wind").innerHTML = "Wind: " + Number(data.wind.speed).toFixed()+ " mph";
      document.getElementById("today" + "Humid").innerHTML = "Humidity: " + Number(data.main.humidity).toFixed()+ "%";
      
      // Get current weather icon
      var iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      document.getElementById(`imgToday`).src = iconUrl;
    
    })

  // Using a for loop to get 5 day forecast temperature, wind speed and humidity for the city input from OpenWeatherMap API
  fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&units=imperial&appid=7f33fc68da77ae927d774bda8401789c')
    .then(response => response.json())
    .then(data => {

      for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Temp").innerHTML = "Temp: " + Number(data.list[i].main.temp).toFixed()+ "°F";
        document.getElementById("day" + (i+1) + "Wind").innerHTML = "Wind: " + Number(data.list[i].wind.speed).toFixed()+ " mph";
        document.getElementById("day" + (i+1) + "Humid").innerHTML = "Humidity: " + Number(data.list[i].main.humidity).toFixed()+ "%";
      }
 
      // Using a for loop to get 5 day forecast weather icon
      for(i = 0; i<5; i++){
        var iconCode = data.list[i].weather[0].icon;
        var iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        document.getElementById(`img${i+1}`).src = iconUrl;
      }

    })

    // Catch error if invalid city name is entered into the city input
    .catch(err => alert("invalid city name!"));

  // Using a for loop to get the 5 dates after today 
  for(i = 0; i<5; i++){
    var date = dayjs(today);
    date = date.add(i+1, 'day');
    document.getElementById("day" + (i+1)).innerHTML = date.format("M/D/YYYY");
  }
}

// When the search button is click for the city input, getWeather(city) function above is triggered
searchBtn.addEventListener('click', function(){
  document.getElementById("weatherContainer").style.display="block"

  var city = cityInput.value.trim();

  if (city === "") {
    return;
  }

  getWeather(city);

  // Each time the search button is click, a button is created for that city
  var cityButton = document.createElement("button");
  cityButton.classList.add("btn", "btn-warning", "mb-2", "text-uppercase");
  cityButton.textContent = city;
  savedCityBtn.appendChild(cityButton);

  // Add event listener to newly created city button to retrieve the city weather information 
  cityButton.addEventListener('click', function() {
    getWeather(cityButton.textContent);
  });

  // Clear input field after each time the search button is clicked 
  cityInput.value = "";
});

