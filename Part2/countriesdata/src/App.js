import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

const DisplayCountryResult = ({country, showDetails}) => {
  if (showDetails === false) {
    
  }
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag}/>
    </div>
  )
}

const DisplaySearchResults = ({countries, showDetails, updateDetails}) => {
  if (countries.length === 0) {
    return null
  }

  console.log("DisplaySearchResults", showDetails)

  const displayCountryInfo = (country, index) => {
    if (showDetails[index] === false) {
      return (
      <li key={country.name}>
        {country.name}
        <button onClick={() => updateDetails(index)}>show</button>
      </li>)
    }
    return <DisplayCountryResult key={country.name} country={country} showDetails={showDetails[index]}/>
  }

  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country, index)=> displayCountryInfo(country, index))}
      </ul>
    )
  }
  return (
    <DisplayCountryResult country={countries[0]} showDetails={true} />
  )
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countryData, setCountryData] = useState([])
  const [showDetails, setShowDetails] = useState([])

  useEffect(() => {
    console.log("Effect")
    Axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountryData(response.data)
      })
  }, [])
  console.log(countryData)

  const changeCountryDetails = (index) => {
    console.log('changeCountryDetails', index)
    setShowDetails(showDetails.map((details, i) => index === i ? !details : details))
  }

  const updateInputStr = (event) => {
    setSearch(event.target.value)
    setShowDetails(Array(seachedCountries.length).fill(false))
  }

  const seachedCountries = countryData.filter((country) => country.name.includes(search))
  console.log("searchedCountries ", seachedCountries.length)
  if (seachedCountries.length === 1) {
    console.log(seachedCountries)
  }

  return (
    <div>
      <h1>Countries</h1>
      Find countries:<input value={search} onChange={updateInputStr}/>
      <div>
        <DisplaySearchResults countries={seachedCountries} showDetails={showDetails} updateDetails={changeCountryDetails}/>
      </div>
      
    </div>
  );
}

export default App;
