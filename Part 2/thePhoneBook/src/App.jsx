import { useState, useEffect } from 'react'
import phoneService from './services/phones'
import Notification from './components/Notifications'
import Footer from './components/Footer'

const App = () => {
  const hook = () => {
    console.log('effect')
    phoneService.getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
  })
  } 

  useEffect(hook, [])
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }

  const toggleImportanceOf = id => {
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, important: !person.important }

    phoneService
    .update(id, changedPerson).then(returnedNote => {
      setPersons(persons.map(note => note.id !== id ? note : returnedNote))
    })

    .catch(error => {
      setErrorMessage(
        `Note '${person.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setPersons(persons.filter(n => n.id !== id))
    })
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = persons.filter(person => (
        person.name.toLowerCase().includes(search.toLowerCase())
      ))

  const handleSubmit = (event) => {
    event.preventDefault()
      const newPerson = {
        name: newName,
        number: newNumber
      }    
      if (persons.some(person => person.name === newName)) {
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) &&
      phoneService.update(persons.find(p => p.name === newName).id, { ...newPerson, number: newNumber })
        .then(updatedPerson => {
          setPersons(
          persons.map(p =>
          p.id !== updatedPerson.id ? p : updatedPerson
        )
    )
})
      return
    }
    phoneService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('') 
        setNewNumber('') 
      })
      setErrorMessage(`Added ${newName}`)
       setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleDelete = (id) => {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
      phoneService.remove(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <>
    <h1>Notes</h1>
    <Notification message={errorMessage} />
    <h2>Phonebook</h2>
    <input placeholder='search...' value={search} onChange={handleSearch} />
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
    <h2>Numbers</h2>
    <ul>
      {personsToShow.map(person => ( 
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick = {() => handleDelete(person.id)}>delete</button>
        </li>
      ))}
    </ul>
    <Footer />
    </>
  )
}

export default App
