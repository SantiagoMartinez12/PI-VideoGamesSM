import { FETCH_VIDEOGAME, FIND_GAME , GET_GENRES, FILTER_GENRE, FILTER_DB_API,FILTER_SORT, FILTER_SORT_RATING}  from "../actions"
import {ASCENDENTE,DESCENDENTE, RATINGMAS, RATINGMENOS} from "../../const"

const initialState = {
    videoGames : [],
    findGame: [],

    filterVideoGames : [],
    genreGame : []
}

export default function reducer( state = initialState, action) {

    switch(action.type) {
        case FETCH_VIDEOGAME:
            return {
                ...state,
                videoGames:action.payload.data,
                filterVideoGames:action.payload.data,
                findGame:[]
            }
            case FIND_GAME: 
            
                return {
                ...state,
                filterVideoGames:action.payload.data,
                findGame:action.payload.data
            }
            case 'FILTER_PLATS':
                const allVideo = state.videoGames

                const filter = allVideo.filter((el => el.platforms?.includes(action.payload)))
            return {
                ...state,
                filterVideoGames: filter
            }

            case GET_GENRES:
                return {
                ...state,
                genreGame: action.payload.data
            }
            case 'POST_VG':
                return {
                    ...state
                }
            case FILTER_GENRE:
                let allVideogames
                if(state.findGame.length > 0){
                    allVideogames = state.findGame
                } else {
                    allVideogames = state.videoGames
                }
                
                //const allVideogames = state.videoGames
                    // filtro primero el array de objetos, segundo mapeo generos tercero
                    // pregunto si incluye ese genero que traigo por payload... 
                const filtergenre = allVideogames.filter((el) => el.genres.includes(action.payload)) 
                
                return {    
                        ...state,
                        filterVideoGames: action.payload === 'all' ? state.videoGames : filtergenre
                }
            
            case FILTER_DB_API:
                const allVideogames1 = state.videoGames
                const filterGame = action.payload === "created" ? allVideogames1.filter(el => el.createdInDb) : allVideogames1.filter(el => !el.createdInDb)
                    
                return {
                        ...state,
                        filterVideoGames: action.payload === 'all' ? state.videoGames : filterGame
                    }

            case FILTER_SORT:
                let orderedVG = [...state.filterVideoGames]
                console.log(state.filterVideoGames)
                console.log(state.findGame)
                
                
                

                let orderedVideo = orderedVG.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return action.payload === ASCENDENTE ? -1 : 1;
                    }
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return action.payload === ASCENDENTE ? 1 : -1;
                    }
                    return 0;
                })

                console.log(orderedVideo)
                return {
                    ...state,
                    filterVideoGames: orderedVideo
                }
                case FILTER_SORT_RATING:
                    let orderedVGRating
                
                if(state.findGame.length > 0){
                    orderedVGRating = [...state.findGame]
                } else {
                    orderedVGRating = [...state.filterVideoGames]
                }

                let orderedVideo1 = orderedVGRating.sort((a, b) => {
                    if (a.rating < b.rating) {
                        return action.payload === RATINGMAS ? 1 : -1;
                    }
                    if (a.rating > b.rating) {
                        return action.payload === RATINGMAS ? -1 : 1;
                    }
                    return 0;
                })
                
                return {
                    ...state,
                    filterVideoGames: orderedVideo1
                }
     
            default:
                return state
    }
}
 
                