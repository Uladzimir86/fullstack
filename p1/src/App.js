import React, { useState, useEffect } from 'react';
import Filter from './filter';
import Form from './form';
import Persons from './persons';
import axios from 'axios';

const App = () => {

  const [notes, setNotes] = useState([])
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons').then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
        console.log(response)
      })
  }, [])

  const [filterPer, setFilterPer] = useState([])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilterPer={setFilterPer} persons={notes}/>
      <Form persons={notes} setPersons={setNotes}/>

      <h2>Numbers</h2>
        <ul>
          {
            notes.map((item, ind) => <li key={ind}>{item.name} {item.number}</li>)
          }
        </ul>
        <Persons filterPer={filterPer}/>
          
    </div>
  )
}

export default App