import React, { useState, useEffect } from 'react';
import personService from './services/persons';

import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import Notification from './components/Notification';
import Error from './components/Error';

import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      console.log(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    for (let i = 0; i < persons.length; i++) {
      if (newName === '' || newNumber === '') {
        return alert('Must specify a name and a number');
      } else if (newName === persons[i].name) {
        const check = window.confirm(
          `${persons[i].name} is already added to the phonebook, replace the old number with a new one?`
        );
        if (check === true) {
          const changedPerson = { ...persons[i], number: newNumber };
          personService
            .update(persons[i].id, changedPerson)
            .then(() => {
              setConfirmationMessage(`updated ${persons[i].name}'s number`);
              setTimeout(() => {
                setConfirmationMessage(null);
              }, 5000);
            })
            .catch((error) => {
              setErrorMessage(
                `${persons[i].name} was already removed from the server`
              );
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            });
          personService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
          });
        }
        return;
      }
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setConfirmationMessage(`Added ${newName}`);
        setTimeout(() => {
          setConfirmationMessage(null);
        }, 5000);
        setNewName('');
        setNewNumber('');
      })
      .catch((error) => {
        //console.log(error.response.data);
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleDelete = (id, name) => {
    const check = window.confirm(`Do you want to delete ${name}?`);
    if (check === true) {
      personService.deletePerson(id);
      // Segment below with setTimeout may be abit wonky? For the moment i cant figure out how to get it to work properly without this, (the issue is that when i delete some1 from the phonebook it doesnt rerender, and if it does it still prints a empty bulletpoint)
      setTimeout(() => {
        personService.getAll().then((initialPersons) => {
          setPersons(initialPersons);
        });
      }, 10);
      // end of segment
      setConfirmationMessage(`Successfully removed ${name}`);
      setTimeout(() => {
        setConfirmationMessage(null);
      }, 5000);
    }
  };

  /* Got help with this one below from the internet, however changed it to match this code. But it still doesnt matter how many letters there are, e.g the input "eeeee" still matches "Arto Hellas" */
  /* The function returns a boolean (true/false) depending if the string/name contains the letters specified in the input */
  const nameFilter = (input, name) => {
    return Array.prototype.every.call(input, (unicodeChar) =>
      name.toLowerCase().includes(unicodeChar.toLowerCase())
    );
  };

  const personsToShow = persons.filter(
    (person) => nameFilter(newFilter, person.name) === true
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={confirmationMessage} />
      <Error message={errorMessage} />
      <Filter filter={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
