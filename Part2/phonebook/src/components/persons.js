import React from 'react'

const Persons = (props) => {
  return (
    <ul>
      {props.filteredPersons.map((person) => 
        <li 
          key={person.name}>{person.name} {person.number}
          <button onClick={() => {props.deleteFunc(person.id, person.name)}}>Delete</button>
        </li>)}
    </ul>
  )
}

export default Persons;