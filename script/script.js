//Fetch data from weather API
function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                errorMessage();
            } else {
                updateUI(data);
            }
        })
        .catch(err => console.log(err));
}

//Update UI with fetched data by creating elements
function updateUI(weatherData) {
    const cityName = document.createElement('h1');
    cityName.innerText = `${weatherData.name}`;
    cityName.classList.add('city-name');
    const temp = document.createElement('h2');
    temp.innerText = `Temperature: ${weatherData.main.temp}°C`;
    temp.classList.add('temp');
    const humidity = document.createElement('h2');
    humidity.innerText = `Humidity: ${weatherData.main.humidity}%`;
    humidity.classList.add('humidity');
    const clouds = document.createElement('h2');
    clouds.innerText = `Clouds: ${weatherData.clouds.all}%`;
    clouds.classList.add('clouds');
    const windSpeed = document.createElement('h2');
    windSpeed.innerText = `Wind Speed: ${weatherData.wind.speed}km/h`;
    windSpeed.classList.add('wind-speed');
    const description = document.createElement('h2');
    description.innerText = `Description: ${weatherData.weather[0].description}`;
    description.classList.add('description');
    const weatherContainer = document.querySelector('[data-weather]');
    weatherContainer.innerHTML = '';
    weatherContainer.appendChild(cityName);
    weatherContainer.appendChild(temp);
    weatherContainer.appendChild(humidity);
    weatherContainer.appendChild(clouds);
    weatherContainer.appendChild(windSpeed);
    weatherContainer.appendChild(description);
}

//error message if city is not found
function errorMessage() {
    //add class to search input to shake it
    const searchInput = document.querySelector('[data-city]');
    searchInput.classList.add('shake');
    //remove class after 1s
    setTimeout(() => {
        searchInput.classList.remove('shake');
    }
    , 1000);
}

//call fetchWeatherData function when enter pressed in search box #city
document.querySelector('[data-city]').addEventListener('keypress', (e) => {
    if (e.code === 'Enter') {
        fetchWeatherData(e.target.value);
    }
});

//call fetchWeatherData function when search button clicked
document.querySelector('[data-search]').addEventListener('click', () => {
    fetchWeatherData(document.querySelector('[data-city]').value);
});

//when clicked on lable of serach box, search box will be focused
document.querySelector('[data-label]').addEventListener('click', () => {
    document.querySelector('[data-city]').focus();
});