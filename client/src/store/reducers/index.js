import { FETCH_VIDEOGAME, FIND_GAME } from "../actions"


const initialState = {
    videoGames : [],
    filterVideoGames : []
}

export default function reducer( state = initialState, action) {

    switch(action.type) {
        case FETCH_VIDEOGAME:
            return {
                ...state,
                videoGames:action.payload.data,
                filterVideoGames:action.payload.data
            }
        case FIND_GAME: 
            return {
                ...state,
                filterVideoGames:action.payload.data,
            }
            default:
                return state
    }
}