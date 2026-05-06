import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const hook = () => {
    console.log('effect')
    axios.get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  } 

  useEffect(hook, [])
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = persons.filter(person => (
        person.name.toLowerCase().includes(search.toLowerCase())
      ))

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(newPerson))
    setNewName('') 
    setNewNumber('') 
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
    <h2>Phonebook</h2>
    <input placeholder='search...' value={search} onChange={handleSearch} />
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>add</button>
      </div>
    </form>
    <h2>Numbers</h2>
    <ul>
      {personsToShow.map(person => ( 
        <li key={person.id}>{person.name} {person.number}</li>
      ))}
    </ul>
    </>
  )
}

export default App
