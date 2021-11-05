
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { getGenres, postVideoGame } from '../store/actions';
import styles from './stilos/gameCreate.module.css'


export default function GameCreate (){
    const dispatch = useDispatch()
    const genres1 = useSelector((state) => state.genreGame)
    const history = useHistory()

    const [input, setInput] = useState({
        name: "",
        description:"",
        platforms:[],
        background_image:"",
        released:"",
        rating:"",
        genres:[]

    })

    useEffect (() => {
        dispatch(getGenres())
    },[])

        function  handleChange(e){
            setInput({
                ...input,
                [e.target.name]: e.target.value

            })
        }
        function handleSelection(e){
            setInput({
                ...input,
                genres : [...input.genres, e.target.value]
            })
        
        }
        function handleCheck(e){
            if(e.target.checked){
                setInput({
                ...input,
                platforms: [...input.platforms,e.target.value ]
                })
            }
        }
        function handleSubmit(e){
            e.preventDefault()
            console.log(input)
            dispatch(postVideoGame(input))
            alert("Videogame created")
            setInput({
                name: "",
                description:"",
                platforms:[],
                background_image:"",
                released:"",
                rating:"",
                genres:[]
                    })
          history.push("/home")          
        }
        
    return(
        <div>
            <Link to="/home"><button>Go Back</button></Link>
            <h1>Create your Video Game</h1>
            <form  onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                        <input 
                        type="text" 
                        value={input.name}
                        name="name"
                        onChange={(e)=>handleChange(e)}
                        />
                </div>
                <div>
                    <label>Description:</label>
                        <input 
                        type="text" 
                        value={input.description}
                        name="description" 
                        onChange={(e)=>handleChange(e)}
                        />
                </div>
                <div>
                    <label>Image:</label>
                    <input 
                    type="text"
                    value={input.background_image}
                    name="background_image" 
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input 
                    type="number"
                    value={input.rating}
                    name="rating"
                    step={0.1} 
                    min={0.1}
                    max={5}
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Released</label>
                    <input
                    type="date"
                    name="released"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Platforms:</label>
                    <label>PC
                    <input 
                    type="checkbox"
                    name="PC"
                    value="PC"
                    onChange={(e)=>handleCheck(e)}
                    /></label>
                    
                    <label>PS5
                    <input 
                    type="checkbox"
                    name="PS5"
                    value="PS5"
                    onChange={(e)=>handleCheck(e)}
                    /></label>
                    <label>PS4
                    <input 
                    type="checkbox"
                    name="PS4"
                    value="PS4"
                    onChange={(e)=>handleCheck(e)}
                    /></label>
                      <label>PS3
                    <input 
                    type="checkbox"
                    name="PS3"
                    value="PS3"
                    onChange={(e)=>handleCheck(e)}
                    /></label>
                    <label>Xbox Serie X/S
                    <input 
                    type="checkbox"
                    name="Xbox Serie"
                    value="Xbox Serie"
                    onChange={(e)=>handleCheck(e)}
                    /></label>
                      <label>Xbox One
                    <input 
                    type="checkbox"
                    name="Xbox One"
                    value="Xbox One"
                    onChange={(e)=>handleCheck(e)}
                    /></label>
                      <label>Xbox 360
                    <input 
                    type="checkbox"
                    name="Xbox 360"
                    value="Xbox 360"
                    onChange={(e)=>handleCheck(e)}
                    /></label>
                      <label>WII
                    <input 
                    type="checkbox"
                    name="WII"
                    value="WII"
                    onChange={(e)=>handleCheck(e)}
                    /></label>
                      <label>Nintendo
                    <input 
                    type="checkbox"
                    name="Nintendo"
                    value="Nintendo"
                    onChange={(e)=>handleCheck(e)}
                    /></label>
                </div>
                <div>
                    <label>Genres:
                    <select className={styles.selectG} multiple onChange={(e)=>handleSelection(e)}>
                        {
                           genres1?.map((el =>{
                            return(
                                <option value={el.name}>{el.name}</option>
                            )
                            }))
                        }
                    </select>
                    </label>
                </div>
                <button type="submit">Create Your Game</button>
                
            </form>
        </div>
    )   
}