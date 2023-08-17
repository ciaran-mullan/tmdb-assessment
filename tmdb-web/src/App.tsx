import {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import IndexPage from './pages';
import SearchPage from './pages/search';
import SearchResultBox from './components/SearchResultBox';
import MovieData from './models/movieData';
import MovieNavbar from './components/Navbar';

function App() {

  const [backendData, setBackendData] = useState([{}]);
  const [searchValue, setSearchValue] = useState('');

  const getPopularMovie = () => {
    fetch("/popular").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data.data);
      }
    )
  }

  const getMovieRequest = () => {
    fetch(`/search/${searchValue}`).then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data.data);
      }
    )
  }

  useEffect(() => {
    {searchValue.length > 0 ? getMovieRequest() : getPopularMovie()};
  }, [searchValue])

  return (
    <Router>
      <div className='App'>
        <MovieNavbar searchValue={searchValue} setSearchValue={setSearchValue}/>

        <div className="container">
          <Routes>
            <Route path="/" element={<IndexPage/>} />
            <Route path='/search' element={<SearchPage/>} />
          </Routes>
          {backendData.length > 0 ? (
            <div className='grid'>
              {backendData.map((movieReq: any)=>
              <SearchResultBox key={movieReq.id} {...movieReq}/>)}
            </div>
          ) : (
            <h2>No movies found</h2>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
