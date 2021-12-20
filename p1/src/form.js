import React, { useState } from 'react';
import axios from 'axios';

const Form = ({persons, setPersons}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleForm = (e) => {
        e.preventDefault();
        axios
          .post('/api/persons', {name: newName, number: newNumber}).then(response => {
            setPersons([...persons, response.data]);
            console.log(response.data)
          })
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