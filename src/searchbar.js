import { checkWeather } from "./weather";

export function setSearchBar() {
    const searchButton = document.querySelector(".fas.fa-search");
    const cityInput = document.getElementById("city-input");
    searchButton.addEventListener("click", () => {
        if(document.getElementById('search-bar').style.width == "50px"){
            document.getElementById('search-bar').style.width = "400px";
            cityInput.style.paddingRight = "60px";
        }
        else checkWeather(cityInput.value) 
    })
    document.addEventListener("keydown", (event) => {
        if(event.key == "Enter"){
            checkWeather(cityInput.value)
        }
    })
}
