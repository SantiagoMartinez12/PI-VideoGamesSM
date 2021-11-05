import { FETCH_VIDEOGAME, FIND_GAME , GET_GENRES, FILTER_GENRE, FILTER_DB_API,FILTER_SORT, FILTER_SORT_RATING}  from "../actions"
import {ASCENDENTE,DESCENDENTE, RATINGMAS, RATINGMENOS} from "../../const"

const initialState = {
    videoGames : [],
    filterVideoGames : [],
    genreGame : []
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
            console.log("aqui entre")
                return {
                ...state,
                filterVideoGames:action.payload.data,
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
                const allVideogames = state.videoGames
                    // filtro primero el array de objetos, segundo mapeo generos tercero
                    // pregunto si incluye ese genero que traigo por payload... 
                const filtergenre = allVideogames.filter((el) => el.genres.includes(action.payload)) 
                console.log(filtergenre)
                return {    
                        ...state,
                        filterVideoGames: filtergenre
                }
            case FILTER_DB_API:
                const allVideogames1 = state.videoGames
                const filterGame = action.payload === "created" ? allVideogames1.filter(el => el.createdInDb) : allVideogames1.filter(el => !el.createdInDb)
                    console.log(filterGame)
                return {
                        ...state,
                        filterVideoGames: action.payload === 'all' ? state.filterVideoGames : filterGame
                    }

            case FILTER_SORT:
                let orderedVG = [...state.videoGames]

                let orderedVideo = orderedVG.sort((a, b) => {
                    if (a.name < b.name) {
                        return action.payload === ASCENDENTE ? -1 : 1;
                    }
                    if (a.name > b.name) {
                        return action.payload === ASCENDENTE ? 1 : -1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    filterVideoGames: orderedVideo
                }
                case FILTER_SORT_RATING:
                    let orderedVGRating = [...state.videoGames]

                let orderedVideo1 = orderedVGRating.sort((a, b) => {
                    if (a.rating < b.rating) {
                        return action.payload === RATINGMAS ? -1 : 1;
                    }
                    if (a.rating > b.rating) {
                        return action.payload === RATINGMAS ? 1 : -1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    filterVideoGames: orderedVideo1
                }
                    
    


                /*
                let orderVideoGame = [...state.videoGames]
                let lpm = orderVideoGame.sort((a, b) =>{
                if(a.name[0].toLowerCase() < b.name[0].toLowerCase()) {
                    console.log(a.name[0])
                    return action.payload === 'asc' ? -1 : 1
                }
                if(a.name[0].toLowerCase() > b.name[0].toLowerCase()){
                    return action.payload === 'desc' ? 1 : -1
                }
                return 0;
            })
            return{
                ...state,
                filterVideoGames: lpm
            }
        */
                
               
            
             


            
            default:
                return state
    }
}
 
                