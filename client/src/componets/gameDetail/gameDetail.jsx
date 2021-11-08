import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styles from "./detail.module.css"




export default function GameDetail (){
    const [videoGames, setVideogames] = useState(null)
        let id = useParams()
        let ids = id.id;
        console.log(videoGames)
       
    useEffect(() => {
            axios.get('http://localhost:3001/videogame/' + ids)
            .then((response) => {
                setVideogames(response.data)
            })
            return () => {
                setVideogames(null)
            }
    }, [])

//[ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
//[ ] Descripción
//[ ] Fecha de lanzamiento
//[ ] Rating
//[ ] Plataformas
    

        
    return <div>
                <div classname={styles.divc}>
                            <div classname={styles.clase}>
                                <Link to='/home'>
                                <button>Go Back</button>
                                </Link>
                            </div>
                        <div className={styles.conte}>

                    {
                        
                        videoGames ? 
                        <> 
                        <h5 className={styles.names}>{videoGames?.name}</h5>
                        <conteiner className={styles.contimage}>
                        <img src={videoGames?.background_image} alt='image'className={styles.image}/>
                        </conteiner>
                        <conteiner className={styles.descrip}>
                        <p className={styles.description}>Description: {videoGames?.description?.replace(/<[^>]*>?/g, "")}</p>
                        </conteiner>
                        <p className={styles.genre}>Genres: {videoGames.genres.map(el => el.name).join(", ")}</p>
                        <p className={styles.platform}>Platform: {videoGames?.platforms.join(", ")}</p>
                        <p className={styles.released}>Released: {videoGames?.released || "not found"} </p>
                        <p className={styles.rating}>Rating: {videoGames?.rating}</p>
                        
                        
                        </> :
                        <div className={styles.loading}>Loading...</div>
                        
                    }
                        </div>
                    
            

                </div>

    </div>
};
    
    