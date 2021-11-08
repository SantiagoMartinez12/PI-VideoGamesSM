import React from "react";
import {Link} from "react-router-dom"
import styles from "./stilos/landing.module.css"

export default function LandingPage(){
    const style = {
        textDecoration:"none"
    }
    return <div className={styles.divs}>
        <div className={"style.divWel"}>
       <h1 className={styles.h1}> SEARCH YOUR FAVORITE GAME </h1>
     
       </div>
       <div className={styles.divWel}>
           
       <Link to="/home" styles={style}>
           <h1>START SEARCH</h1>
       </Link>
       

    </div>

    <div className={styles.prest}>
        <p>Individual Proyect</p>
        
        <br />
        <br />
        <p>Santiago Martinez</p>
    </div>
    
    </div>
}