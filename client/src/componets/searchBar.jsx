import {useState} from 'react';
import { searchVideoGame } from '../store/actions';
import { useDispatch } from 'react-redux';
export default function SearchBar() {
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()
    function onSubmit(e) {
        e.preventDefault();
        dispatch(searchVideoGame(search))
        
        setSearch("")
    }
    function onInputChange(e) {
        e.preventDefault()
        setSearch(e.target.value)
        
    }
    return <div>
        <form onSubmit={onSubmit}>
            <input type="text" onChange={onInputChange} value={search} placeholder="Search"/>
            <input type="submit" value="Buscar" />
        </form>
    </div>
}