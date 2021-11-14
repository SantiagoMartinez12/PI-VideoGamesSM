import './App.css';
import Home from './componets/home/home';
import GameDetail from './componets/gameDetail/gameDetail'
import { Route, Switch } from 'react-router-dom'
import { useEffect} from 'react'
import { useDispatch } from "react-redux"
import { fetchVideoGame } from './store/actions';
import LandingPage from './componets/landing/landing';
import GameCreate from './componets/gameCreate/gameCreate';





function App() {
  const dispatch = useDispatch();
  //const allVideogames = useSelector((state) => state.videogames)
  useEffect (() => {
  dispatch(fetchVideoGame() );
  },[dispatch])
  return (
  
      <div className="App">
        <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route path='/home' component={Home} />
            <Route exact path='/videogame' component={GameCreate} />
            <Route path='/:id' component={GameDetail} />
        </Switch>
      </div>
    
  );
}

export default App;
