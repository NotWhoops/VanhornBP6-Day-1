import { API_KEY } from './environment.js';

window.addEventListener("load", () => {

    output.textContent = "Getting your location...";

    navigator.geolocation.getCurrentPosition(


        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            output.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;

            // ✅ Now that we have coords, call the API
            apiCall(latitude, longitude);
        },


        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    output.textContent = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    output.textContent = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    output.textContent = "The request to get user location timed out.";
                    break;
                default:
                    output.textContent = "An unknown error occurred.";
            }
        }
    );


    function apiCall(lat, lon) {
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }
});