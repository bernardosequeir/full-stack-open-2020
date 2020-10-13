import React from "react";
import phoneService from "../services/phonebook";

const Phonebook = ({ persons, setPersons, filter }) => {
  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      phoneService.deleteUser(person.id).then(() => {
        setPersons(persons.filter((item) => item !== person));
      });
    }
  };
  return (
    <>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={() => deletePerson(person)}>delete</button>
          </p>
        ))}
    </>
  );
};

export default Phonebook;
