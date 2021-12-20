import React, { useState, useEffect } from 'react';
import Filter from './filter';
import Form from './form';
import Persons from './persons';
import axios from 'axios';

const App = () => {

  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios
      .get('/api/persons').then(response => {
        setNotes(response.data)
        console.log(response.data)
      })
  }, [])

  const [filterPer, setFilterPer] = useState([])
  const deleteHandler = (e) => {
    const id = e.target.dataset.del;
    console.log(id)
    axios
      .delete(`/api/persons/${id}`).then(response => {
        // setNotes(response.data)
        console.log(response.data)
      })
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilterPer={setFilterPer} persons={notes}/>
      <Form persons={notes} setPersons={setNotes}/>

      <h2>Numbers</h2>
        <ul>
          {
            notes.map((item, ind) => <li key={ind}>
              {item.name} {item.number} <br/>
                <button onClick={deleteHandler} data-del={item.id}>Del</button>
                {/* <button onClick={addHandler} data-add ={item.id}>Add</button> */}
                <hr/>
              </li>)
          }
        </ul>
        <Persons filterPer={filterPer}/>
          
    </div>
  )
}

export default App