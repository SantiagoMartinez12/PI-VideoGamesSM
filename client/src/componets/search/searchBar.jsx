import {useState} from 'react';
import { fetchVideoGame, searchVideoGame } from '../../store/actions';
import { useDispatch } from 'react-redux';
import styles from "./search.module.css"

export default function SearchBar() {
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()
    function onSubmit(e) {
        e.preventDefault();
        if(!search){
            dispatch(fetchVideoGame())
        } else {
        dispatch(searchVideoGame(search))
        
        setSearch("")
    }
}
    function onInputChange(e) {
        e.preventDefault()
        setSearch(e.target.value)
        
    }
    return <div>
        <form onSubmit={onSubmit} className={styles.search}>
            <input type="text" onChange={onInputChange} value={search} placeholder="Insert name " className={styles.text}/>
            <input type="submit" value="Search" className={styles.boton}/>
        </form>
    </div>
}