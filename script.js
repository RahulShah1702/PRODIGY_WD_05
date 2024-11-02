let apiKey = '9505fd1df737e20152fbd78cdb289b6a';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;

const form = document.querySelector("form");
const input = document.getElementById("name");
const cityElement = document.querySelector(".name figcaption");
const flagElement = document.querySelector(".name img");
const tempImg = document.querySelector(".temperature img");
const tempValue = document.querySelector(".temperature figcaption span");
const description = document.querySelector(".description");
const clouds = document.getElementById("clouds");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const main = document.querySelector("main");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
        fetchWeather(input.value);
    }
});

function fetchWeather(city) {
    fetch(`${apiUrl}&q=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                triggerError();
            }
        });
}

function displayWeather(data) {
    const { name, sys, main: { temp, humidity: humid, pressure: press }, weather, clouds: cloudiness } = data;
    
    cityElement.innerText = name;
    flagElement.src = `https://flagsapi.com/${sys.country}/shiny/32.png`;
    tempImg.src = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
    tempValue.innerText = Math.round(temp);
    description.innerText = weather[0].description;
    
    clouds.innerText = cloudiness.all;
    humidity.innerText = humid;
    pressure.innerText = press;
    
    main.classList.remove("error");
}

function triggerError() {
    main.classList.add("error");
    setTimeout(() => main.classList.remove("error"), 1000);
    input.value = "";
}

// Fetch default city on load
function initApp() {
    input.value = "Mumbai";
    fetchWeather(input.value);
}
initApp();
