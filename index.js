// Fetch a random landscape-oriented nature photo from the Unsplash API
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json()) // Convert the response to JSON
    .then(data => {
        // Set the background image of the document body to the fetched photo
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
        // Set the author text to the name of the photographer
		document.getElementById("author").textContent = `By: ${data.user.name}`;
    })
    .catch(err => {
        // If there's an error, set a default background image and author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`;
		document.getElementById("author").textContent = `By: Dodi Achmad`;
    })

// Fetch data about Dogecoin cryptocurrency from the CoinGecko API
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        // Check if the response is okay, otherwise throw an error
        if (!res.ok) {
            throw Error("Something went wrong");
        }
        // Convert the response to JSON
        return res.json();
    })
    .then(data => {
        // Populate the HTML with information about Dogecoin
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `;
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.zar}</p>
            <p>👇: $${data.market_data.low_24h.zar}</p>
        `;
    })
    .catch(err => console.error(err));

// Define a function to get and display the current time
function getCurrentTime() {
    const date = new Date();
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"});
}

// Update the current time every second
setInterval(getCurrentTime, 1000);

// Get the user's current geolocation and fetch weather data based on it
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            // Check if the response is okay, otherwise throw an error
            if (!res.ok) {
                throw Error("Weather data not available");
            }
            // Convert the response to JSON
            return res.json();
        })
        .then(data => {
            // Generate the URL for the weather icon
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            // Populate the HTML with weather information
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}ºC</p>
                <p class="weather-city">${data.name}</p>
            `;
        })
        .catch(err => console.error(err));
});
