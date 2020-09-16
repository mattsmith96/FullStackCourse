import React, { useState , useEffect } from 'react'
import Persons from './components/persons'
import PersonForm from './components/personForm'
import Filter from './components/filter'
import peopleService from './services/people'
import Notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ alertMessage, setAlertMessage ] = useState(null)
  const [ error, setError ] = useState(false)

  useEffect(() => {
    console.log("Effect")
    peopleService.getAll()
      .then(response => setPersons(response))
  }, [])

  const addName = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.some((person) => person.name === newName)) {
      if (!window.confirm(`${newName} is already added to the phonebook, replace old number with new one?`)) {
        return
      }
      const existingPerson = persons.find(person => person.name === newName)
      const newPerson = {...existingPerson, number: newNumber}
      peopleService
        .updateNumber(existingPerson.id, newPerson)
        .then(updatedPerson => {
          console.log(updatedPerson)
          setPersons(persons.map(person => person.name !== newName ? person : updatedPerson))
          setNewName('')
          setNewNumber('')
          setError(false)
          setAlertMessage(`${updatedPerson.name}'s number was updated`)
          setTimeout(() => {
            setAlertMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error)
          setError(true)
          setAlertMessage(`${newPerson.name}'s number has already been removed from the server`)
          setPersons(persons.filter(person => person.name !== newPerson.name))
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setAlertMessage(null)
          }, 5000)
        })
      return
    }

    peopleService.addNew(newPerson)
      .then(response => {    
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setError(false)
        setAlertMessage(`${newPerson.name}'s info was added`)
        setTimeout(() => {
          setAlertMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (id, name) => {
    console.log("Delete person ", id)

    if (!window.confirm(`Do you want to delete ${name}?`)) {
      console.log("Delete cancelled")
      return
    }

    peopleService.deleteEntry(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setError(false)
        setAlertMessage(`${name}'s info was deleted`)
        setTimeout(() => {
          setAlertMessage(null)
        }, 5000)
      })
      .catch(error => {
        setError(true)
        setAlertMessage(`${name}'s number has already been removed from the server`)
        setPersons(persons.filter(person => person.name !== name))
        setTimeout(() => {
          setAlertMessage(null)
        }, 5000)
      })
  
  }

  const changeNameInput = (event) => {
    setNewName(event.target.value)
  }
  const changeNumberInput = (event) => {
    setNewNumber(event.target.value)
  }
  const changeFilterInput = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter((person) => person.name.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={alertMessage} error={error} />

      <Filter filter={filter} changeFilterInput={changeFilterInput}/>

      <h3>Add a New Number</h3>
      <PersonForm 
        addNameHandler={addName} 
        changeNameInput={changeNameInput}
        changeNumberInput={changeNumberInput}
        newName={newName}
        newNumber={newNumber} />

      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} deleteFunc={deletePerson} />
    </div>
  )
}

export default App