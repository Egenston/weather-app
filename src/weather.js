const weatherInfo = document.getElementById('info');
export function checkWeather(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ad1977908a9a0b7a62f8666f6122ea0a&units=metric`, {mode: 'cors'})
        .then(function(response) {
            if(response.ok) return response.json();
            else return "error"  
        })
        .then(function(response) {
            const notFoundError = document.getElementById('not-found-error');    
            if(response != "error"){
                const searchbar = document.getElementById("search-bar");
                const cityInput = document.getElementById("city-input");
                //search button pressed when searchbar is in the middle of the page
                if(cityInput.value.length != 0 && !searchbar.classList.contains("on-top")){
                    searchbar.style.width = "50px";
                    searchbar.style.top = "10%";
                    cityInput.style.paddingRight = "20px";
                    cityInput.disabled = true;
                    notFoundError.style.opacity = "0";
                    setWeather(response);
                    setHourlyDailyWeather(response);
                    setWeatherBackground(response.weather[0]);
                    slideToTop();
                    document.getElementById('wrapper').style.overflow = "auto";
                    setTimeout(() => {
                        searchbar.classList.add("on-top");
                        cityInput.value = "";
                    }, 1000);
                }
                //search button pressed when on top of the page (outputs new weather)
                else if (cityInput.value.length != 0 && searchbar.classList.contains("on-top")){
                    searchbar.style.width = "50px";
                    cityInput.style.paddingRight = "20px";
                    cityInput.disabled = true;
                    notFoundError.style.opacity = "0";
                    document.getElementById('wrapper').style.overflow = "hidden";
                    slideToBottom();
                    setTimeout(() => {
                        setWeather(response);
                        setWeatherBackground(response.weather[0]);
                        setHourlyDailyWeather(response);
                        slideToTop();
                        document.getElementById('wrapper').style.overflow = "auto";
                        cityInput.value = "";
                    }, 1000);
                } 
            }
            else{
                notFoundError.style.opacity = "1";
            }    
        })
}

function setWeather(weather) {
    document.getElementById('city-name').textContent = weather.name;
    document.getElementById('weather-status').textContent = weather.weather[0].description;
    document.getElementById('temperature').innerHTML = Math.round(weather.main.temp) + '<span>&deg</span>';
}
function setHourlyDailyWeather(weather) {
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=ad1977908a9a0b7a62f8666f6122ea0a&units=metric`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        var currentTime = response.current.dt;
        const hourlyWeather = document.getElementById('hourly-weather');
        hourlyWeather.innerHTML = "";
        for (let i = 0; i < response.hourly.length/2 + 1; i++) {
            if (currentTime > response.hourly[i].dt) {
                continue;
            }
            else{
                var hourWeather = document.createElement('div');
                hourWeather.className = "hour-weather";

                var hourText = document.createElement('p');
                var hour = new Date(response.hourly[i].dt * 1000);
                hourText.textContent = hour.getHours() + ":00";
                hourWeather.appendChild(hourText);

                var icon = setWeatherIcon(response.hourly[i].weather);
                hourWeather.appendChild(icon);

                var temperature = document.createElement('p');
                temperature.innerHTML = Math.round(response.hourly[i].temp) + "<span>&deg</span>";
                hourWeather.appendChild(temperature);

                hourlyWeather.appendChild(hourWeather);
            }
        }
        setDailyWeather(response);
    })
}
function setDailyWeather(weather) {
    const daysWeather = document.getElementById("days-weather");
    daysWeather.innerHTML = "";
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (let i = 1; i < weather.daily.length; i++) {
        var dayWeather = document.createElement('div');
        dayWeather.className = "day-weather";

        var dayName = document.createElement("p");
        dayName.className = "day-name";
        var currentTime = new Date(weather.daily[i].dt * 1000);
        dayName.textContent = weekdays[currentTime.getDay()];
        dayWeather.appendChild(dayName);

        var dayIcon = setWeatherIcon(weather.daily[i].weather);
        dayIcon.classList.add("day-weather-icon");
        dayWeather.appendChild(dayIcon);

        var dayHumidity = document.createElement("p");
        dayHumidity.className = "day-weather-humidity";
        dayHumidity.textContent = weather.daily[i].humidity + "%";
        dayWeather.appendChild(dayHumidity);

        var dayMaxTemp = document.createElement("p");
        dayMaxTemp.className = "day-weather-max";
        dayMaxTemp.textContent = Math.round(weather.daily[i].temp.max);
        dayWeather.appendChild(dayMaxTemp);

        var dayMinTemp = document.createElement("p");
        dayMinTemp.className = "day-weather-min";
        dayMinTemp.textContent = Math.round(weather.daily[i].temp.min);
        dayWeather.appendChild(dayMinTemp);

        daysWeather.appendChild(dayWeather);
    }
}
function setWeatherBackground(weather) {
    if (weather.description.includes("thunderstorm")) {
        setBackground("https://www.stormgeo.com/assets/ArticleImages/thunderstorm-flipped__FocusFillWzQyODgsMjcwMCwieSIsNzRd.jpg");
    }
    else if(weather.description.includes("clouds")){
        setBackground("https://images.unsplash.com/photo-1569241095162-e3b9a583b9d3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JleSUyMGNsb3Vkc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80");
    }
    else if (weather.description.includes("rain")){
        document.body.style.backgroundImage = "url(https://images.unsplash.com/photo-1569241095162-e3b9a583b9d3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JleSUyMGNsb3Vkc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80)";
        document.querySelector('.rain').style.opacity = "1";
    }
    else if (weather.description.includes("clear") && weather.icon.includes("d")){
        setBackground("https://rh7soccershow.co.za/wp-content/uploads/2019/03/sunny-day-white-sky-4k-time-lapse_ekyxov3___F0000.png");
    }
    else if (weather.description.includes("clear") && weather.icon.includes("n")){
        setBackground("https://coolwallpapers.me/picsup/3050399-milky-way_night_sky_stars.jpg");
    }
    else{
        setBackground("https://images.unsplash.com/photo-1569241095162-e3b9a583b9d3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JleSUyMGNsb3Vkc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80");
    }
}
function setBackground(url) {
    document.body.style.backgroundImage = `url(${url})`;
    document.querySelector('.rain').style.opacity = "0";
}
function setWeatherIcon(weather) {
    var icon = document.createElement('i');
    if(weather[0].description.includes("clouds")){
        icon.innerHTML = '<i class="fas fa-cloud"></i>';
    }
    else if(weather[0].description.includes("thunderstorm")){
        icon.innerHTML = '<i class="fas fa-bolt"></i>';
    }
    else if(weather[0].description.includes("rain") || weather[0].description.includes("drizzle")){
        icon.innerHTML = '<i class="fas fa-cloud-rain"></i>';
    }
    else if(weather[0].description.includes("snow")){
        icon.innerHTML = '<i class="far fa-snowflake"></i>';
    }
    else{
        if (weather[0].icon.includes("d") && weather[0].description.includes("clear")) {
            icon.innerHTML = '<i class="fas fa-sun"></i>';
        }
        else if (weather[0].icon.includes("n") && weather[0].description.includes("clear")){
            icon.innerHTML = '<i class="fas fa-moon"></i>';
        }
        else{
            icon.innerHTML = '<i class="fas fa-cloud"></i>';
        }
    }
    return icon;
}
function slideToTop() {
    weatherInfo.style.top = "20%";
}
function slideToBottom() {
    weatherInfo.style.top = "110%"; 
}