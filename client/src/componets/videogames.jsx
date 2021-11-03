import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {fetchVideoGame} from '../store/actions/index'
import Videogame from "./videogame"

export default function AllVideoGames(){

   let videoGame = useSelector((state) => state.filterVideoGames)
  //let dispatch = useDispatch()
 // useEffect(() => {
   //   dispatch(fetchVideoGame())
  //}, [])

    return <div>
        {videoGame.map((game) => {
         return <Videogame id={game?.id} key={game?.id} name={game?.name} image={game?.background_image} />
})}              <Videogame/>
    </div>
}
