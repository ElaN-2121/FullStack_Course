import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <>
    <h1>Find Countries</h1>

    <input value={search} onChange={handleSearch} />

    <div>
      {filteredCountries.length > 10 && (<p>Too many matches, specify another filter please!</p>
    )}

    {filteredCountries.length <= 10 &&
    filteredCountries.length > 1 &&
    filteredCountries.map(country => (
      <p key={country.cca3}>{country.name.common}</p>
    ))}

    {filteredCountries.length === 1 && (
      <div>
        <h2>{filteredCountries[0].name.common}</h2>
        <p>capital {filteredCountries[0].capital[0]}</p>
        <p>area {filteredCountries[0].area}</p>
        <h1>languages</h1>
        <ul>
          {Object.values(filteredCountries[0].languages).map(language=>(
            <li key={language}>{language}</li>
          ))}
        </ul>

        <img 
        src={filteredCountries[0].flags.png} 
        alt={`flag of ${filteredCountries[0].name.common}`} 
        width="150"
        />

      </div>
    )}

    </div>
    </>
  )
  
}
export default App
