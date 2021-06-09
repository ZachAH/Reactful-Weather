import React from 'react';
import './App.css';

const api = {
  key: "568ada73d42b03c55773847f98ad37c5",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  return (
    <div className="app">
     <main>
       <div className="search-box">
         <input type="text"
         className="search-bar"
         placeholder="Search..."
         />
       </div>
     </main>
    </div>
  );
}

export default App;
