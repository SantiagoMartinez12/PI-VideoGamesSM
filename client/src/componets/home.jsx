
import React from "react"
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {fetchVideoGame , getGenres, filterGenre, filterGameAPIorDB, filterSort} from '../store/actions/index'
import  Card from './card'
import FilterGenre from "./filtradoGenre"
import Paginado from "./paginado"
import SearchBar from "./searchBar"
import {ASCENDENTE,DESCENDENTE} from "../const"





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
        console.log("entre")
        dispatch(filterGenre(e.target.value))
        }
    function handleFilter(e){
            dispatch(filterGameAPIorDB(e.target.value))
        }
  
    function handleFilterSort(e){
        dispatch(filterSort(e.target.value))
    }    
 
    return <div>
     <Link to="/videogame">Crear Video Juego</Link>
     <h1>Video Game</h1>
     <button onClick={e => {handleClick(e)}}>Volver a cargar videojuegos</button>
     <div>
         <SearchBar />
         <select onChange={e => handleFilterSort(e)}>
             <option value ={ASCENDENTE}>Ascendente</option>
             <option value={DESCENDENTE}>Descendente</option>
         </select>
         <select onChange={e => handleFilterByGenre(e)}>
        {
            genres?.map((el =>{
                return(
                    <option value={el.name}>{el.name}</option>
                )
            }))
        }

        </select>
      
         <select onChange={e => handleFilter(e)}>
             <option value='all'>Todos</option>
             <option value='created'>Creados</option>
             <option value='api'>Api</option>
            
         </select>
         <Paginado 
         gamesPerPage={gamesPerPage}
         allVideogames = {allVideogames.length}
         paginado = {paginado}
         />
         {
           currentGame?.map(el => {
               return(
               <Card id={el.id} key={el.id} name={el.name} image={el.background_image} genre={el.genres} /> 
               )
           })
           
         }
     </div>
    </div>
}