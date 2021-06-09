import React from "react";
import "./App.css";

const api = {
  key: "568ada73d42b03c55773847f98ad37c5",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const dateBuilder = (d) => {
    let months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date} ${year}`;
  };

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
        <div className="location-box">
          <div className="location">Whitefish Bay, WI</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">15 degrees</div>
          <div className="weather"> Sunny </div>
        </div>
      </main>
    </div>
  );
}

export default App;
