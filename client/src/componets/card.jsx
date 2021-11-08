import React from 'react';
import { Link } from 'react-router-dom';
import Paginado from './paginado';
import styles from './stilos/card.module.css'




export default function Card ({name, image, genre, id}) {
   
    const filterGenre = genre
   console.log(genre)
    return (
        <div className={styles.cards}>
        <Link to={`/${id}`} className={styles.link}>
            <div classname={styles.lele}>
            <h3 classname={styles.namer}>{name}</h3>
            </div>
          <div classname={styles.image}>
            <img src={image} alt='image'  />
            </div>
            <div classname={styles.genre}>
            {
                filterGenre.map((el => {
                    return <p>{el?.name || el}</p>
                }))
            }
          </div>
        </Link>
    </div>
    )
        }
