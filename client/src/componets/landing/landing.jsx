import React from "react";
import {Link} from "react-router-dom"
import styles from "./landing.module.css"

export default function LandingPage(){
    const style = {
        textDecoration:"none"
    }
    return <div className={styles.divs}>
        <div className={styles.tittle}>
       <h1 className={styles.h1}> SEARCH YOUR FAVORITE GAME </h1>
       </div>
       
           
       <Link to="/home" styles={style}>
       <button className={styles.pruebas}></button>
       </Link>
       

    
    
    
        <p className={styles.prest}>Individual <br/><br/> Proyect <br/> <br/> Santiago Martinez</p>
        
        
    
    
    </div>
}