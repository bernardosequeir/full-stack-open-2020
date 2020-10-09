import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Filter from "./components/Filter";
function App() {
  const [countries, setCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then((response) => setCountries(response.data));
  }, []);

  return (
    <div className="App">
      {countries.length > 0 ? (
        <>
          <Filter
            search={search}
            setSearch={setSearch}
            countries={countries}
            setDisplayedCountries={setDisplayedCountries}
          />
          {<Countries search={search} countries={displayedCountries} />}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
