const apikey = "b12478fd97d65a1e7eab9b8230a1e76c"

const weatherEl = document.getElementById("weather-data")

const cityInp = document.getElementById("city-input")

const formEl = document.querySelector("form")

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    const cityValue = cityInp.value;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp)
        
        const description = data.weather[0].description

        const icon = data.weather[0].icon

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
        ]

        weatherEl.querySelector(".icon").innerHTML = ` <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`

        weatherEl.querySelector(".temperature").textContent = `${temperature}°C`;

        weatherEl.querySelector(".description").textContent = `${description}`;

        weatherEl.querySelector(".details").innerHTML = details.map((detail)=> `<div>${detail}</div>`).join("");


    } catch (error) {
        weatherEl.querySelector(".icon").innerHTML = "";

        weatherEl.querySelector(".temperature").textContent ="";

        weatherEl.querySelector(".description").textContent = "An error occured, please try again"

        weatherEl.querySelector(".details").innerHTML ="";

    }
}
