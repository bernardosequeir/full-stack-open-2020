import React, { useEffect, useState } from "react";
import axios from 'axios';
import Weather from "./Weather";

const Country = ({ country, expanded }) => {
  const [ show, setShow] = useState(expanded)

  const handleShow = () => {
    setShow(!show)
  }
  
  if(!show){
    return (<p key={country.name}>{country.name} <button onClick={handleShow}>show</button></p>)
  }
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h2>languages</h2>
      {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
      <img src={country.flag} style={{width:100 }} />
      <Weather country={country}/>
    </>
  );
};

export default Country;
