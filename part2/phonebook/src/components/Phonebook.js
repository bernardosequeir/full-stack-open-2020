import React from "react";

const Phonebook = ({ persons, filter }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.filter(person=>person.name.toLowerCase().includes(filter.toLowerCase())).map((person)=> 
      <p key={person.name}>{person.name} {person.number}</p>)}
    </>
  );
};

export default Phonebook;
