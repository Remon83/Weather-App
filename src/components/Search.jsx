/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./search.module.css";

const { searchBar, btn, inputBar } = styles;

const Search = ({ setWeatherData, setLoading, setError }) => {
  const [input, setInput] = useState("");
  const changeHnadler = (e) => {
    setInput(e.target.value);
    console.log(input);
  };
  const fetchWeatherData = (term) => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${term}&units=metric&appid=341861ec21f8f448a88ebf17485225dc`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setInput("");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  const searchHandler = (input) => {
    if (!input) {
      return;
    }
    fetchWeatherData(input);
  };
  return (
    <header>
      <h1>Weather Forecast</h1>
      <div className={searchBar}>
        <input
          type="text"
          value={input}
          onChange={changeHnadler}
          className={inputBar}
          placeholder="Search City"
        />
        <button onClick={() => searchHandler(input)} className={btn}>
          Search
        </button>
      </div>
    </header>
  );
};

export default Search;
