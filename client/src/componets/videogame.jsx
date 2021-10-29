
import styles from './stilos/videogame.module.css';

export default function Videogame(props){
    return <div className={styles.card}>

         <div  className={styles.lala}>

          <h3>{props.name}</h3>

          <img className={styles.img} src={props.image}
                                        alt={props.image} ></img>

                </div> 
    </div>
}