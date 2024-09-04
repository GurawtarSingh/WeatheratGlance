let weather = {
    apiKey: "aba6ff9d6de967d5eac6fd79114693cc",
    fetchWeather: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { country } = data.sys;

        document.querySelector(".city").innerText = "Weather in " + name;

        // Fetch the flag using the REST Countries API
        fetch(`https://restcountries.com/v3.1/alpha/${country}`)
            .then(response => response.json())
            .then(countryData => {
                const flagUrl = countryData[0].flags.svg; // Use SVG flag for better quality
                const countryName = countryData[0].name.common;
                document.querySelector(".country").innerHTML = `<img src="${flagUrl}" alt="${countryName} flag" class="flag-icon" /> ${countryName}`;
            })
            .catch(error => {
                console.error("Error fetching flag:", error);
                document.querySelector(".country").innerText = country; // Fallback to country code
            });

        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function(event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Ludhiana");

// menu-bar
// Toggle the navigation links on small screens
document.getElementById('menu-show').addEventListener('click', function() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});