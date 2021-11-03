import './App.css';
import Home from './componets/home';
import SearchBar from './componets/searchBar';
import AllVideoGames from './componets/videogames';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { fetchVideoGame, getGenres } from './store/actions';
import LandingPage from './componets/landing';





function App() {
  const dispatch = useDispatch();
  //const allVideogames = useSelector((state) => state.videogames)
  useEffect (() => {
  dispatch(fetchVideoGame() );
  },[dispatch])
  return (
  <BrowserRouter>
    <div className="App">
    <Switch>
     <Route exact path='/' component={LandingPage}/>
      <Route path='/home' component={Home} />
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
