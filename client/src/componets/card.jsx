import React from 'react';


export default function Card ({name, image, genre}) {
    const divStyle = {
        border: "1px solid",
        
      };
    const filterGenre = genre
    return (
    <div style={divStyle}>
            <h3>{name}</h3>
            {
                filterGenre?.map((el => {
                    return <h4 key={el.id}>{el.name}</h4>
                }))
            }
          
     
            <img src={image} alt='image' width='300px' height="250px" />
    </div>
    )
}