import { useState, useEffect } from "react";
import Search from "./components/Search";
import "./App.css";
import WeatherResults from "./components/WeatherResults";
import { ThreeDots } from "react-loader-spinner";
import ErrorHandler from "./components/ErrorHandler";
function App() {
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    } catch (error) {
      setError(error);
    }
  }, [lat, long]);
  console.log(typeof lat, typeof long);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=341861ec21f8f448a88ebf17485225dc&units=metric`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [lat, long]);

  console.log(weatherData);
  // console.log(weatherData);

  return (
    <div className="container">
      <Search
        setWeatherData={setWeatherData}
        loading={loading}
        setLoading={setLoading}
        setError={setError}
      />
      {loading ? (
        <div className="spinner">
          <p>Loading... Please wait</p>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#dfd327"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : error ? (
        <ErrorHandler setError={setError} error={error} />
      ) : (
        <WeatherResults
          results={weatherData}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}

export default App;
