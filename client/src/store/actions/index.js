import axios from 'axios'
export const FETCH_VIDEOGAME = 'FETCH_VIDEOGAME'
export const FIND_GAME ='FIND_GAME'


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
        axios.get('http://localhost:3001/videogame?name=' + search)
        .then((game) => {
            dispatch({
                type:FIND_GAME,
                payload: game
            })
        })
        .catch((error) => {
            console.log(error)
    })
}
}

