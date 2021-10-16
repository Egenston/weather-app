fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=ad1977908a9a0b7a62f8666f6122ea0a&units=metric', {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    })
// fetch('https://api.openweathermap.org/data/2.5/onecall?lat=51.5085&lon=-0.1257&exclude=minutely,alerts&appid=ad1977908a9a0b7a62f8666f6122ea0a&units=metric', {mode: 'cors'})
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(response) {
//         console.log(response);
//     })
//     .catch(err => {
//         console.log(err);
//     })
import { setDaytimeTheme } from "./theme";
import { setSearchBar } from "./searchbar";
setDaytimeTheme();
setSearchBar();