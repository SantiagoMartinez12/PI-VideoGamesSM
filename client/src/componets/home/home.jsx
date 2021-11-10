
import React from "react"
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {fetchVideoGame , getGenres, filterGenre, filterGameAPIorDB, filterSort, filterSortRating} from '../../store/actions/index'
import  Card from '../card/card'
import Paginado from "../paginado/paginado"
import SearchBar from "../search/searchBar"
import {ASCENDENTE,DESCENDENTE,RATINGMAS,RATINGMENOS } from "../../const"
import styles from './home.module.css'


//  -------     IMAGE NOT FOUND -----------
//https://m.media-amazon.com/images/I/71FRuuxuaUL._SS500_.jpg

export default function Home(){
  // --------------------traigo generos para options ---------------   
    const genres = useSelector((state) => state.genreGame)
    useEffect (() => {
    dispatch(getGenres() );
    },[])

    //--------------PAGINADO---------------------------------
    const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.filterVideoGames)
  
 
  
  const [currentPage,setCurrentPage] = useState(1)
  const [gamesPerPage,setGamesPerPage] = useState(15)
  const indexOfLastGame = currentPage * gamesPerPage 
  const indexOfFirstGame = indexOfLastGame - gamesPerPage
  const currentGame = allVideogames.slice(indexOfFirstGame,indexOfLastGame)
  

  const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
  }
  
 //---------------FUNCIONES-------------------

    function handleClick(e){
        e.preventDefault()
        dispatch(fetchVideoGame())

    }
    function handleFilterByGenre(e){
        
        dispatch(filterGenre(e.target.value))
        }
    function handleFilter(e){
            dispatch(filterGameAPIorDB(e.target.value))
        }
  
    function handleFilterSort(e){
        dispatch(filterSort(e.target.value))
    }    
    function handleFilterSortRating(e){
        dispatch(filterSortRating(e.target.value))
    }
    
    return <div className={styles.father}>
           <div className={styles.home}>
     <Link to="/">
         <button>Home</button>
     </Link>
        </div>
        <div className={styles.create}>
     <Link to="/videogame" className={styles.lap}>
         <button>Create your game</button>
     </Link>
        </div>
        <div>
     <div className={styles.videogame}>
     <h1 className={styles.title}>SEARCH YOUR GAME</h1>
     </div>
     </div>
    
     <div>
         <SearchBar />
         <label> A-Z | Z-A :
         <select onChange={e => handleFilterSort(e)} className={styles.selects}>
             <option >Seleccionar</option>
             <option value ={ASCENDENTE}>Ascendente</option>
             <option value={DESCENDENTE}>Descendente</option>
         </select>
         </label>
         <label>Rating :
         <select onChange={e => handleFilterSortRating(e)}  className={styles.selects}>
             <option>Seleccionar</option>
             <option value ={RATINGMAS}>Rating +</option>
             <option value={RATINGMENOS}>Rating -</option>
         </select>
         </label>
         <label> Genres :
         <select onChange={e => handleFilterByGenre(e)}  className={styles.selects}>
                    <option >Seleccionar</option>
        {
            genres?.map((el =>{
                return(
                    <option key={el.name} value={el.name}>{el.name}</option>
                )
            }))
        }

        </select>
        </label>
        <label> Game DB or API :
         <select onChange={e => handleFilter(e)}  className={styles.selects}>
             <option value='all'>Todos</option>
             <option value='created'>Creados</option>
             <option value='api'>Api</option>
            
         </select>
         <button onClick={e => {handleClick(e)}}>Reload VideoGames</button>
         </label>
             <Paginado 
             gamesPerPage={gamesPerPage}
             allVideogames = {allVideogames.length}
             paginado = {paginado}
             />
         
         <div>
         <div className={styles.cards}>
           
         { 
            
            
             allVideogames.length > 0 ?
             
             currentGame?.map(el => {
                 
                 return(

               <Card id={el.id} key={el.id} name={el.name} image={el.background_image} genre={el.genres} /> 
               )
               
           }) : 
           
           <div>
               Game Not Found
           </div> 

          
           
        
         }
         </div>
         </div>
         <Paginado 
         gamesPerPage={gamesPerPage}
         allVideogames = {allVideogames.length}
         paginado = {paginado}
         />
     </div>
    </div>

    }   
 
    

