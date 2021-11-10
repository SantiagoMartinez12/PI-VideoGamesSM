import axios from 'axios'
export const FETCH_VIDEOGAME = 'FETCH_VIDEOGAME'
export const FIND_GAME ='FIND_GAME'
export const GET_GENRES = 'GET_GENRES'
export const FILTER_BY_STATUS = 'FILTER_BY_STATUS'
export const FILTER_GENRE = 'FILTER_GENRE'
export const FILTER_DB_API = 'FILTER_DB_API'
export const FILTER_SORT = 'FILTER_SORT'
export const FILTER_SORT_RATING = 'FILTER_SORT_RATING'


/*
export const fetchVideoGame = () => {
    return async function (dispatch) {
        const videogames = await axios.get('http://localhost:3001/videogame');
        dispatch({ type: FETCH_VIDEOGAME, payload: videogames });
    };
};
*/
export function fetchVideoGame() {
        return function(dispatch) {
            axios.get('http://localhost:3001/videogame')
            .then((games) => {
                dispatch({
                    type:FETCH_VIDEOGAME,
                    payload: games
                })
            })
        }
}
export function searchVideoGame(search) {
   
    return function(dispatch) {
        if(!search){return fetchVideoGame()} else {
        console.log(search)
        axios.get('http://localhost:3001/videogame?name=' + search)
        .then((game) => {
            dispatch({
                type:FIND_GAME,
                payload: game
            })
        })
        
    }
}}

export function postVideoGame(payload){
    return async function(dispatch) {
        const response = await axios.post('http://localhost:3001/videogame', payload)
        return response 
    }
}

export function getGenres(){
    return function(dispatch) {
        axios.get('http://localhost:3001/genregame')
        .then((genres) => {
            dispatch({
                type:GET_GENRES,
                payload: genres
            })
        })
    }
} 
export function filterGenre(payload){
    console.log(payload)
   return {
        type:FILTER_GENRE,
        payload
    }
}
export function filterGameAPIorDB(payload){
    return {
        type:FILTER_DB_API,
        payload
    }
}
export function filterSort(payload){
    console.log(payload)
    return {
        type:FILTER_SORT,
        payload
    }
}
export function filterSortRating(payload){
    console.log(payload)
    return {
        type:FILTER_SORT_RATING,
        payload
    }
}








