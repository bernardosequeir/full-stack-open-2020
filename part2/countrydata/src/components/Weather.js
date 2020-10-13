import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [data, setData] = useState(null);
  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: country.capital,
  };

  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current", { params })
      .then((response) => setData(response.data.current));
  }, []);
  return (
    <>
      {data ? (
        <>
          <h2>Weather in {country.capital}</h2>{" "}
          <p>
            <b>temperature:</b> {data.temperature} celsius
          </p>
          <img src={data.weather_icons[0]} />
          <p>
            <b>wind:</b>
            {data.wind_speed} mph direction {data.wind_dir}
          </p>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Weather;
