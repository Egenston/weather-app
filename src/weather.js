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
                    notFoundError.style.opacity = "0";
                    setWeather(response);
                    slideToTop();
                    setTimeout(() => {
                        searchbar.classList.add("on-top");
                        cityInput.value = "";
                    }, 1000);
                }
                //search button pressed when on top of the page (outputs new weather)
                else if (cityInput.value.length != 0 && searchbar.classList.contains("on-top")){
                    searchbar.style.width = "50px";
                    cityInput.style.paddingRight = "20px";
                    notFoundError.style.opacity = "0";
                    slideToBottom();
                    setTimeout(() => {
                        setWeather(response);
                        slideToTop();
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
function slideToTop() {
    weatherInfo.style.top = "20%";
}
function slideToBottom() {
    weatherInfo.style.top = "110%"; 
}