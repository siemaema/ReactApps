import "./App.css";
import { useState, useEffect } from "react";
function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

async function getWeather(location) {
  try {
    // 1) Getting location (geocoding)
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
    );
    const geoData = await geoRes.json();

    if (!geoData.results) throw new Error("Location not found");

    const { latitude, longitude, timezone, name, country_code } =
      geoData.results.at(0);
    console.log(`${name} ${convertToFlag(country_code)}`);

    // 2) Getting actual weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
    );
    const weatherData = await weatherRes.json();
    console.log(weatherData);
    return {
      location: `${name} ${convertToFlag(country_code)}`,
      temperature_2m_max: weatherData.daily.temperature_2m_max,
      temperature_2m_min: weatherData.daily.temperature_2m_min,
      weathercode: weatherData.daily.weathercode,
      time: weatherData.daily.time,
    };
  } catch (err) {
    console.error(err);
  }
}

function App() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (value) {
      setLoading(true);
      getWeather(value)
        .then((d) => {
          setData(d);
          setLoading(false);
        })
        .catch(() => {
          setData(null);
          setLoading(false);
        });
    }
  }, [value]);
  console.log(data);
  return (
    <div className="app">
      <p>Lokalizacja</p>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>

      <p>
        {loading ? (
          "Loading..."
        ) : data ? (
          <div className="weather">
            {data.time.map((day, index) => (
              <Kafel
                key={index}
                date={formatDay(day)}
                temperatureMax={data.temperature_2m_max[index]}
                temperatureMin={data.temperature_2m_min[index]}
                weathercode={data.weathercode[index]}
                location={data.location}
              />
            ))}
          </div>
        ) : (
          <p>wpisz lokalizacje</p>
        )}
      </p>
    </div>
  );
}

function Kafel({
  date,
  temperatureMax,
  temperatureMin,
  weathercode,
  location,
}) {
  if (!date) return;
  return (
    <div className="day">
      <div className="day">
        <span>{getWeatherIcon(weathercode)}</span>
        <p>{date}</p>
        <p>
          <p>{temperatureMin}-</p>
          <p>{temperatureMax}</p>
        </p>
      </div>
    </div>
  );
}

export default App;
