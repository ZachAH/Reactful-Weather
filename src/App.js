import React, { useState } from "react";
import "./App.css";

// Import video files directly
import clearVideo from "./assets/sunnyweather.webm";
import cloudsVideo from "./assets/cloudyweather.webm";
import rainVideo from "./assets/rainyweather.webm";
//import snowVideo from "./assets/snowyweather.webm";
import thunderVideo from "./assets/thunderstormyweather.webm";
import defaultVideo from "./assets/sunnyweather.webm";


// Configure the API key and base URL for WeatherAPI.com
const api = {
  key: "cad980cf6a8b4da4b5903239251508",
  base: "https://api.weatherapi.com/v1/",
};

// Define video URLs for different weather conditions using the imported variables
const videoUrls = {
  clear: clearVideo,
  clouds: cloudsVideo,
  rain: rainVideo,
  //snow: snowVideo,
  thunderstorm: thunderVideo,
  default: defaultVideo
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]); // This will store the 3-day forecast
  const [videoUrl, setVideoUrl] = useState(videoUrls.default);

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}forecast.json?key=${api.key}&q=${query}&days=3`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Location not found");
          }
          return res.json();
        })
        .then((result) => {
          setQuery("");
          setWeather(result);
          setForecast(result.forecast.forecastday);
          console.log(result);

          // Update the video URL based on the current weather condition text.
          // This only changes for the live, current weather.
          const condition = result.current.condition.text.toLowerCase();
          console.log("Weather condition from API:", condition);

          if (condition.includes("sun") || condition.includes("clear")) {
            setVideoUrl(videoUrls.clear);
          } else if (condition.includes("clouds") || condition.includes("overcast")) {
            setVideoUrl(videoUrls.clouds);
          } else if (condition.includes("rain") || condition.includes("drizzle")) {
            setVideoUrl(videoUrls.rain);
          } else if (condition.includes("snow") || condition.includes("sleet") || condition.includes("ice")) {
            setVideoUrl(videoUrls.snow);
          } else if (condition.includes("thunder")) {
            setVideoUrl(videoUrls.thunderstorm);
          } else {
            setVideoUrl(videoUrls.default);
          }
          
          console.log("New video URL set:", videoUrl);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          alert("Could not find that location. Please try again.");
          setQuery("");
          setWeather({});
          setForecast([]);
          setVideoUrl(videoUrls.default);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    let days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date} ${year}`;
  };

  return (
    <div className="app">
      {/* The video background element with a unique key to force reload */}
      <video className="video-background" autoPlay loop muted key={videoUrl}>
        <source src={videoUrl} type="video/webm" />
      </video>

      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter City, Country or Zip..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.current != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.location.name}, {weather.location.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.current.temp_f)}°F</div>
              <div className="weather">{weather.current.condition.text}</div>
            </div>

            <div className="forecast-container">
              <h3>3-Day Forecast</h3>
              {forecast.map((day, index) => (
                <div key={index} className="forecast-day">
                  <div className="forecast-date">
                    {dateBuilder(new Date(day.date)).split(" ")[0]}
                  </div>
                  <div className="forecast-temp">
                    {Math.round(day.day.avgtemp_f)}°F
                  </div>
                  <div className="forecast-description">
                    {day.day.condition.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
