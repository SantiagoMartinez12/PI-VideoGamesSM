import React from 'react';
import { Link } from 'react-router-dom';



export default function Card ({name, image, genre, id}) {
    const divStyle = {
        border: "1px solid",
        
      };
    const filterGenre = genre
   console.log(genre)
    return (
    <div style={divStyle}>
        <Link to={`/${id}`} style={{ color: '#FFF' }}>
            <h3>{name}</h3>
            {
                filterGenre.map((el => {
                    return <p>{el?.name || el}</p>
                }))
            }
          
            <img src={image} alt='image' width='300px' height="250px" />
        </Link>
    </div>
    )
        }
