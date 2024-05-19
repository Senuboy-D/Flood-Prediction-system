import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Progress } from 'antd';
import { API_KEY, locations } from '../utils/const';

const Home: React.FC = () => {
  const [area, setArea] = useState('Rathnapura'); // Default to Rathnapura, adjust as needed
  const [weather, setWeather] = useState({
    temperature: null,
    humidity: null,
    windSpeed: null,
    icon: "",
  });



  

  useEffect(() => {
    const fetchWeather = async () => {
      const location = locations.find((location:any) => location.name === area);
      const latitude = location?.lat;
      const longitude = location?.lon;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      try {
        const response = await axios.get(url);
        const data = response.data;
        setWeather({
          temperature: data.main.temp,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        });
      } catch (error) {
        console.error("Failed to fetch weather data", error);
      }
    };

    fetchWeather();
  }, [area]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      height: "100%",
      backgroundColor: "#f0f2f5"
    }}>

      {
        !weather.temperature && (
          <Progress
            type="circle"
            percent={100}
            format={() => 'Loading...'}
          />
        )
      }
      <label
        style={
          {
            marginBottom: "1rem",
            fontSize: "1.5rem"
          }
        }
       htmlFor="area-select">Choose an area in Rathnapura District</label>
      <select size={
      1
      }
        style={{
          padding: "0.5rem",
          fontSize: "2rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "1rem"
        }}
      id="area-select" value={area} onChange={(e) => setArea(e.target.value)}>
        <option value="Rathnapura">Rathnapura</option>
        <option value="Balangoda">Balangoda</option>
        <option value="Embilipitiya">Embilipitiya</option>
        <option value="Pelmadulla">Pelmadulla</option>
        {/* Add more areas as needed */}
      </select>

      {weather.temperature && (
        <div

          style={
            {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }
          }
        >
          <h3 
          style={
            {
              marginBottom: "1rem"
            }
          }
          >Weather Information for {area}</h3>
          <p style={
            {
              marginBottom: "1rem",
              fontSize: "1.2rem"
            }
          }>Temperature: {weather.temperature} °C</p>
          <p
          style={
            {
              marginBottom: "1rem",
              fontSize: "1.2rem"
            }
          }
          >Humidity: {weather.humidity} %</p>
          <p
          style={
            {
              marginBottom: "0.7rem",
              fontSize: "1.5rem"
            }
          }
          >Wind Speed: {weather.windSpeed} meter/sec</p>
          {weather.icon && <img 
           style={
            {
              width: "100px",
              height: "100px"
            }
           }
          src={weather.icon} alt="Weather Icon" />}
        </div>
      )}
    </div>
  );
};

export default Home;


