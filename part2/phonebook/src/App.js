import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Phonebook from "./components/Phonebook";
import Notification from "./components/Notification";
import phoneService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(true);

  useEffect(() => {
    phoneService.getAll().then((response) => {
      console.log(response);
      setPersons(response);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = { name: newName, number: newNumber };
    if (persons.every((person) => person.name !== newName)) {
      phoneService.create(newObject).then(() => {
        setPersons(persons.concat(newObject));
        setMessage(`Added ${newObject.name}`);
        setMessageSuccess(true);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      });
    } else if (
      window.confirm(
        `${newName} is already added to the phonebook, replace the old number?`
      )
    ) {
      const personToReplace = persons.find(
        (person) => person.name === newObject.name
      );
      console.log(personToReplace);
      phoneService
        .update(personToReplace.id, newObject)
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== personToReplace.id ? person : response
            )
          );
        })
        .catch(() => {
          setMessage(
            `Information of ${personToReplace.name} has already been removed from server`
          );
          setMessageSuccess(false);
          setPersons(persons.filter((item) => item !== personToReplace));
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} success={messageSuccess} />
      <Filter filter={filter} handler={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <Phonebook persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  );
};

export default App;
