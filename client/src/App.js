import './App.css';
import Home from './componets/home';
import SearchBar from './componets/searchBar';
import AllVideoGames from './componets/videogames';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <AllVideoGames />
    </div>
  );
}

export default App;
