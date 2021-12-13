import React from 'react';

const Filter = ({setFilterPer, persons}) => {
    
    const handleFilterChange = (e) => {
        setFilterPer(persons.filter(({name}) => name.toLowerCase().includes(e.target.value))) 
      }

  return (
    <>
        filter shown with:
        <input 
        type="text"
        onChange={handleFilterChange}
        />
    </>
  )
}

export default Filter;
