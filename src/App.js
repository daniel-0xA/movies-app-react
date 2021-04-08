import React, {useEffect, useState, useRef} from 'react'
import Movie from './components/Movie'
import {FEATURED_API, SEARCH_API} from './API'

const App = () => {
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const inputEl = useRef(null)

  useEffect(() => {
    fetchData(FEATURED_API)
  }, [])

  const fetchData = (API) => {
    fetch(API).then((response) => {
      return response.json()
    }).then((data) => {
      // console.log(data.results)
      if(data.results){
        setMovies(data.results)
        setTotalPages(data.total_pages)
      }
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
  const goHomeHandler = () => {
    setCurrentPage(1)
    fetchData(FEATURED_API + "1")
  }
  const goPrevHandler = () => {
    if(currentPage > 1){
      const page = currentPage - 1
      setCurrentPage(page)
      fetchData(FEATURED_API + page)
    }
  }
  const goNextHandler = () => {
    if(currentPage < totalPages){
      const page = currentPage + 1
      setCurrentPage(page)
      fetchData(FEATURED_API + page)
    }
  }
  
  return (
    <>
    <div className="header">
      <div className="header-pagination">
        <button onClick={goHomeHandler}>Home</button>
        <button onClick={goPrevHandler}>Prev</button>
        <button onClick={goNextHandler}>Next</button>
        <button className="button-noaction">Page: {currentPage}</button>
      </div>
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