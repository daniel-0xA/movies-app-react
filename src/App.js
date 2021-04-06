import React, {useEffect, useState, useRef} from 'react'
import Movie from './components/Movie'

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&vote_count.gte=1500&page=";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&query=";


const App = () => {
  const [movies, setMovies] = useState([])
  const inputEl = useRef(null)

  useEffect(() => {
    fetchData(FEATURED_API)
  }, [])

  const fetchData = (API) => {
    fetch(API).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data.results)
      setMovies(data.results)
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    const searchTerm = inputEl.current.value
    if(searchTerm){
      fetchData(SEARCH_API + searchTerm)
      inputEl.current.value = ""
    }
  }
  const goHomeHandler = (event) => {
    fetchData(FEATURED_API)
  }
  
  return (
    <>
    <div className="header">
      <button onClick={goHomeHandler}>Home</button>
      <form onSubmit={onSubmitHandler}>
        <input className="header-search" type="search" placeholder="Search" ref={inputEl}/>
      </form>
    </div>
    <div className="movie-container">
      {movies.map((movie) => (
        <Movie key={movie.id} {...movie}/>
      ))}
    </div>
    </>
  )
}
export default App;