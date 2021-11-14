import React from 'react';
import { Link } from 'react-router-dom';
import styles from './card.module.css'




export default function Card ({name, image, genre, id}) {
   
    const filterGenre = genre
   
    return (
        <div className={styles.cards}>
        <Link to={`/${id}`} className={styles.link}>
            
            <img src={image} alt='imagen'  />
            <h3 >{name}</h3>
            
            
            
            
            {
                filterGenre.map((el => {
                    return <p key={el.name}>{el?.name || el}</p>
                }))
            }
          
        </Link>
    </div>
    )
        }
