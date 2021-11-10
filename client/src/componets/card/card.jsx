import React from 'react';
import { Link } from 'react-router-dom';
import Paginado from '../paginado/paginado';
import styles from './card.module.css'




export default function Card ({name, image, genre, id}) {
   
    const filterGenre = genre
   
    return (
        <div className={styles.cards}>
        <Link to={`/${id}`} className={styles.link}>
            <div>
            <h3 >{name}</h3>
            </div>
          <div>
            <img src={image} alt='image'  />
            </div>
            <div>
            {
                filterGenre.map((el => {
                    return <p key={el.name}>{el?.name || el}</p>
                }))
            }
          </div>
        </Link>
    </div>
    )
        }
