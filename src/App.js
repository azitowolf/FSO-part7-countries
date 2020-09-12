import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = () => {
  const [value, setValue] = useState(null)

  const fetch = (name) => {
      console.log('use effect')
      axios.get(`https://restcountries.eu/rest/v2/name/${name}`)
      .then((name)=> {
        console.log(name);
        setValue(name);
      })
      .catch((err) => {
        console.warn(err);
        setValue("not found");
      })
  }

  return {fetch, value}
}

const Country = React.memo(({ country }) => {

  if(!country) {
    return null;
  }

  if (country === "not found") {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data[0].name} </h3>
      <div>capital {country.data[0].capital} </div>
      <div>population {country.data[0].population}</div>
      <img
        src={country.data[0].flag}
        height='100'
        alt={`flag of ${country.data[0].name}`}
      />
    </div>
  );
});

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    console.log("fetching")
    e.preventDefault()
    country.fetch(nameInput.value)
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country.value} />
    </div>
  )
}

export default App