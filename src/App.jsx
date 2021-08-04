import './App.css';
import React, { useState } from 'react';
import Giphy from './components/Giphy';


const App = ()=>{
  const [giphys, setGiphy] = useState([])
  const [searchInput, setSearchInput] = useState("")
  
  let handleChange = (event)=> {
    setSearchInput({ [event.target.name]: event.target.value })
  }
  let handleSubmit = (event)=>{
    event.preventDefault()

    const url = `http://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=${searchInput.searchInput}`
    fetch(url)
        .then(response=> response.json())
      .then(data=> {
        setGiphy([...data.data])
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='searchInput'>Search</label>
        <input
          name='searchInput'
          type='text'
          value={searchInput.value}
          onChange={handleChange}
        />
        <button type='submit'>Search</button>
      </form>
      {giphys.map(giphy=><Giphy key={giphy.images.original.url} giphy={giphy.images.original.url} />)}
    </>
  )
}

export default App;
