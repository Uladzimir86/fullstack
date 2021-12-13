import React from 'react';

const Persons = ({filterPer}) => {
    return (
        <ul>
            {
            filterPer.map((item, ind) => <li key={ind}>{item.name} {item.number}</li>)
            }
        </ul>
    )
}

export default Persons;