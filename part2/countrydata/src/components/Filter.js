import React from "react";

const Filter = ({ search, setSearch, countries, setDisplayedCountries }) => {
  const handleSearch = (event) => {
    let newSearch = event.target.value;
    const matchList = countries.filter((country) =>
      country.name.toLowerCase().includes(newSearch.toLowerCase())
    );
    setSearch(newSearch);
    setDisplayedCountries(matchList);
  };
  return (
    <div>
      find countries <input value={search} onChange={handleSearch}></input>
    </div>
  );
};
export default Filter;
