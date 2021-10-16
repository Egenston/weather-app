export function setDaytimeTheme() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=London&appid=ad1977908a9a0b7a62f8666f6122ea0a&units=metric", {mode: 'cors'})
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            var sunriseTime = response.sys.sunrise;
            var sunsetTime = response.sys.sunset;
            var currentTime = response.dt;
            if(sunriseTime < currentTime && currentTime < sunsetTime){
                document.body.style.backgroundImage = "url(https://rh7soccershow.co.za/wp-content/uploads/2019/03/sunny-day-white-sky-4k-time-lapse_ekyxov3___F0000.png)";
            }
            else if (currentTime > sunsetTime) {
                document.body.style.backgroundImage = "url(https://coolwallpapers.me/picsup/3050399-milky-way_night_sky_stars.jpg)";
            }
        })
}
