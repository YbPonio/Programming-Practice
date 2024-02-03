let apiKey = "093a8b099c59b2bf0b094c80eafe2a11";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city){
    let response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();

    degreCelsius.innerHTML = Math.round(data.main.temp) + "°";
    showCity.innerHTML = data.name;
    windText.innerHTML = data.wind.speed + " km/h";
    humidityText.innerHTML = data.main.humidity + "%";
    feelsLikeText.innerHTML = data.main.feels_like + "°";

    console.log(data);
}

function updateWeather(){
    checkWeather(inputCity.value);
    inputCity.value = "";
}