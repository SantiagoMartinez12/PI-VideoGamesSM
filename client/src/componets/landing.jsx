import React from "react";
import {Link} from "react-router-dom"
import styles from "./stilos/landing.module.css"

export default function LandingPage(){
    return <div>
        <div className={"style.divWel"}>
       <h1 className={styles.h1}> SEARCH YOUR FAVORITE GAME </h1>
       </div>
       <div>
       <Link to="/home">
           <button classname={styles.button}>Get Started</button>
       </Link>
    </div>
    </div>
}