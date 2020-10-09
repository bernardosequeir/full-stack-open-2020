import React from "react";

import Country from "./Country";
const Countries = ({ countries, search }) => {
  console.log(countries);
  if (countries.length === 1) {
    return <Country country={countries[0]} expanded={true} />;
  }
  if (countries.length < 10) {
    return (
      <>
        {countries.map((country) => (
          <Country key={country.name} country={country} expanded={false} />
        ))}
      </>
    );
  } else if (search !== "") {
    return <p>Too many matches, specify another filter</p>;
  }
  return null;
};

export default Countries;

REACT_APP_API_KEY = "ed641bd193ef202ca4887aefd6d2da95";
