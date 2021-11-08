import React from "react";
import styles from './paginado.module.css';

export default function Paginado ({gamesPerPage, allVideogames, paginado}) {
const pageNumbers = [];
 for (let i = 1; i <= Math.ceil(allVideogames/gamesPerPage); i++) {
     pageNumbers.push(i)
 }

 return(
     <nav className={styles.nav}>
         <ul className={styles.ul}>
             {pageNumbers?.map(number => (
                 <li className={styles.li} key={number}>
                 <a className={styles.a} onClick={() => paginado(number)}>{number}</a>
                 </li>
             ))}
         </ul>
     </nav>
 )
}