//
require("dotenv").config();
const { Router } = require('express');
const {Videogame, GenreGame} = require('../db')
const {Op} = require('sequelize');
const { default: axios } = require("axios");
const db = require("../db");
const router = Router();
const { KEY } = process.env;
const URL =`https://api.rawg.io/api/games?key=${KEY}`;
//https://api.rawg.io/api/games?key=d069480d0b644c92b737ed4f5c65efe0&search={counter} 

router.get('/', async (req, res, next) => {   // ACA BUSCO POR NOMBRE O SIMPLEMENTE ME TRAIGO TODO DE API Y DE BASE DE DATOS
    let name = req.query.name
    console.log(name)
    let videoGamePromiseApi
    let videoGamePrimiseDb 
   
    if(name) {
        console.log("entre en name")
        videoGamePromiseApi = axios.get(`https://api.rawg.io/api/games?search=${name}&key=${KEY}&limit=100`)
        videoGamePrimiseDb = Videogame.findAll({
            include: GenreGame,
            where: {
                name:{
                    [Op.iLike]: "%" + name + "%"

                }
            },
            order: [['name', 'ASC']]
        })
        Promise.all([
            videoGamePromiseApi, 
            videoGamePrimiseDb
        ])
        
        .then((response => {
            const [respuestaApi,respuestadb]= response
           // data = [respuestadb,respuestaApi.results]
            let respuestadb1 = respuestadb
            const filterdb = respuestadb1.map((e) => {
                console.log("entre aqui")            
                return {
                     id: e.id,
                    name: e.name,
                     background_image: e.background_image,
                    rating: parseFloat(e.rating),
                    releaseDate: e.released,
                    genres: e.genreGames.map((game) => {
                        return {
                            name: game.name,
                            id: game.id
                        }
                    }),
                    platforms: e.platform,
                    createdInDb: e.createdInDb || true 
            };
            })
           let respuesta = respuestaApi.data.results
          // console.log(respuesta.data.results)
         let respu = respuesta.map((e) => {
            return { //saco los valores que no quiero enviar
                id: e.id,
                name: e.name,
                background_image: e.background_image,
                rating: e.rating,
                releaseDate: e.released,
                genres: e.genres.map((genre) => {
                    return {
                        name: genre.name,
                        id: genre.id,
                    };
                }),
                platforms: e.platforms.map(
                    (el) => el.platform.name
                ),
            };
           })
           
          
        res.send([...filterdb,...respu])
        }))
        // ACA BUSCO POR NOMBRE EN API Y EN DB  
       } else {
           console.log("entre en todo")
           // ACA BUSCO TODO; 
           videoGamePrimiseDb = await Videogame.findAll({ //promesa
               include: GenreGame
           })

           
           
           let arraydata = []
       // videoGamePromiseApi = axios.get(`https://api.rawg.io/api/games?key=${KEY}`) //promesa
       let page1 = (await axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=40`)).data;
       let page2 = (await axios.get(page1.next)).data;
       let page3 = (await axios.get(page2.next)).data;
 
    

    Promise.all([
        page1,page2,page3,videoGamePrimiseDb
    ])
    .then((respuesta) => {
       
        const [
             page1,
             page2,
             page3,
             gameDb//respuesta de la API
             //respuesta de mi base de datos
        ] = respuesta 
        arraydata= [...page1.results,...page2.results,...page3.results]
        ///mis respuestas
        const filterDb = gameDb
        const filtradodb = filterDb.map((el) => {
            return {
                id: el.id,
               name: el.name,
                background_image: el.background_image,
               rating: parseFloat(el.rating),
               releaseDate: el.released,
               genres: el.genreGames.map((game) => {
                   return {
                       name: game.name,
                       id: game.id
                   }
               }),
               platforms: el.platform,
               createdInDb: el.createdInDb || true 
       };
        })
       
        let filteredVideoGameApi = arraydata.map((e) => {
            return { //saco los valores que no quiero enviar
                id: e.id,
                name: e.name,
                description: e.description,
                background_image: e.background_image,
                rating: e.rating,
                releaseDate: e.released,
                genres: e.genres.map((genre) => {
                    return {
                        name: genre.name,
                        id: genre.id,
                    };
                }),
                platforms: e.platforms.map(
                    (el) => el.platform.name
                ),
            };
            }
        )
        //orden para ponerlos de menor a mayor
        
        let allVideogames = [...filtradodb, ...filteredVideoGameApi] //concateno

    console.log(allVideogames.length)
        res.send(allVideogames)
    })
    .catch(error => next(error))
}
})
router.get('/:id', async (req, res, next) => {  // ACA BUSCO POR ID (PRIMERO EN BD LUEGO EN API)
    try {
        console.log("entre en cualquier lado")
        const id = req.params.id;
        let videogame
        if(typeof id === 'string' && id.length > 8) {
            //es mio
            videogame = await Videogame.findByPk(id)
        } else {
            //es de la api
            response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${KEY}`) 
            juego = response.data
        }
        //   `${BASE_URL}${id}?key=${API_KEY}`
        //   https://api.rawg.io/api/games/
        return res.send(juego)
    } catch(error) {
        next(error)
    }
})



router.post('/', async (req, res, next) => {      // creo videojuego y cargo id de genero para
    
  const { 
      name, 
      description, 
      platform, 
      background_image, 
      relaseDate, 
      rating, 
      genres
            } = req.body;
    try {
        await GenreGame.findAll({where: {name:genres}})

        await Videogame.create({ 
            name,
            description,
            background_image,
            relaseDate,
            rating,
            platform
        })
        .then((response) => response.addGenreGame([genres]))
        .then((response) => {
            return res.send(response)
        })

    } catch (err) {
        next(err)
    }
  
    
});
// 977matias15:51
//const createdInDb = videogame.includes('-)
//('-')


// pirmero crear ruta para buscar por id 
/*
router.get('/', (req, res, next) => {
    return Videogame.findAll()
    .then((videogame) => {
        res.send(videogame)
    })
    .catch((err) => {next(error)})
    
});

router.put('/', (req, res, next) => {
    res.send('soy put /videogame')
});

router.delete('/', (req, res, next) => {
    res.send('soy delete /videogame')
});
*/

module.exports = router;
