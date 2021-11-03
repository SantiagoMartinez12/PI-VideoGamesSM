import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {filterGenre, getGenres } from '../store/actions/index'
import genres from '../componets/home'



export default function FilterGenre () {
  
    const dispatch = useDispatch
    function handleFilterByGenre(e){
    dispatch(filterGenre(e.target.value))
    }
    return(
        <select onChange={e => handleFilterByGenre(e)}>
        {
            genres?.map((el =>{
                return(
                    <option value={el.name}>{el.name}</option>
                )
            }))
        }
        
       
        
      </select>
    )
}

