import React, { useState } from 'react';

const Form = ({persons, setPersons}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleForm = (e) => {
        e.preventDefault();
        if (!persons.find(item => item.name === newName)) {
          setPersons([...persons, {name: newName, number: newNumber}]);
        }  else alert(`${newName} is already added to phonebook`);
      }
      const handleNameChange = (e) => {
        setNewName(e.target.value) 
      }
      const handleNewNumber = (e) => {
        setNewNumber(e.target.value) 
      }
      
  return (
    <form onSubmit={handleForm}>
        <div>
            name: <input 
              type="text"
              value={newName}
              onChange={handleNameChange}
            /> <br />
            number: <input 
              type="number"
              value={newNumber}
              onChange={handleNewNumber}
            />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
  )
}

export default Form;