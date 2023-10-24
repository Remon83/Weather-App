/* eslint-disable react/prop-types */
import styles from "./weathrresults.module.css";
import { ThreeDots } from "react-loader-spinner";
import ErrorHandler from "./ErrorHandler";
import { BiWind } from "react-icons/bi";
import { WiHumidity } from "react-icons/wi";
import { BsFillSunriseFill, BsSunsetFill, BsSpeedometer } from "react-icons/bs";
const {
  currentWeather,
  weatherCondition,
  temperature,
  additionalInfo,
  min_max,
} = styles;

const WeatherResults = ({ results, loading, error, setError }) => {
  // console.log(results);
  // console.log(loading);
  const sunRiseDate = new Date(results?.sys?.sunrise * 1000);
  const sunRiseHours = sunRiseDate.getHours();
  const sunRiseminutes = sunRiseDate.getMinutes();
  const sunSetDate = new Date(results?.sys?.sunset * 1000);
  const sunSetHours = sunSetDate.getHours();
  const sunSetMinutes = sunSetDate.getMinutes();
  // console.log(results?.weather[0]);
  return (
    <main>
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
        <ErrorHandler setError={setError} />
      ) : (
        results && (
          <section className={currentWeather}>
            <h2>
              {results?.name}, {results?.sys?.country}
            </h2>
            <div className={weatherCondition}>
              <img
                src={`https://openweathermap.org/img/wn/${results?.weather?.[0]?.icon}@2x.png`}
                alt="Sunny"
              />
              <h2>{results?.weather?.[0]?.main}</h2>
            </div>
            <div className={temperature}>
              <p>{Math.round(results?.main?.temp)}°C</p>
              <span>Feels Like: {Math.round(results?.main?.feels_like)}°C</span>
              <div className={min_max}>
                <p>H: {Math.round(results?.main?.temp_max) + 2}°C</p>
                <p>L: {Math.round(results?.main?.temp_min) - 2}°C</p>
              </div>
            </div>
            <div className={additionalInfo}>
              <div>
                <WiHumidity size="2em" style={{ color: "#ccc" }} /> Humidity:{" "}
                {results?.main?.humidity}%
              </div>

              <div>
                <BiWind size="1.5em" style={{ color: "#ccc" }} /> Wind:{" "}
                {results?.wind?.speed} km/h
              </div>
              <div>
                <BsFillSunriseFill size="1.5em" style={{ color: "#ccc" }} />
                Sunrise: {sunRiseHours}:{sunRiseminutes} AM
              </div>
              <div>
                <BsSunsetFill size="1.5em" style={{ color: "#ccc" }} />
                Sunset: {sunSetHours}:{sunSetMinutes} PM
              </div>
              <div>
                <BsSpeedometer size="1.5em" style={{ color: "#ccc" }} />
                Pressure: {results?.main?.pressure} hPa
              </div>
            </div>
          </section>
        )
      )}
    </main>
  );
};

export default WeatherResults;
