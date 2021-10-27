//
require("dotenv").config();
const { Router } = require('express');
const {Videogame, GenreGame} = require('../db')
const {Op} = require('sequelize');
const { default: axios } = require("axios");
const router = Router();
const { KEY } = process.env;
const URL =`https://api.rawg.io/api/games?key=${KEY}`;
//https://api.rawg.io/api/games?key=d069480d0b644c92b737ed4f5c65efe0&search={counter} 

router.get('/', (req, res, next) => {
    let name = req.query.name
    let videoGamePromiseApi
    let videoGamePrimiseDb 
    if(name) {
        videoGamePromiseApi = axios.get(`https://api.rawg.io/api/games?search=${name}&key=${KEY}`)
        videoGamePrimiseDb = Videogame.findAll({
            include: GenreGame,
            where: {
                name:{
                    [Op.iLike]: "%" + name + "%"

                }
            },
            order: [['name', 'ASC']]
        })
       } else {
        videoGamePromiseApi = axios.get(`https://api.rawg.io/api/games?key=${KEY}`) //promesa
        videoGamePrimiseDb = Videogame.findAll({ //promesa
            include: GenreGame
        })
    }
    Promise.all([
        videoGamePromiseApi,
        videoGamePrimiseDb
    ])
    .then((respuesta) => {
       
        const [
             gameapi//respuesta de la API
            , gameDb //respuesta de mi base de datos
        ] = respuesta ///mis respuestas

        let filteredVideoGameApi = gameapi.data.results.map((e) => {
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
            }
        )
        //orden para ponerlos de menor a mayor
        
        let allVideogames = [...gameDb, ...filteredVideoGameApi] //concateno
        res.send(allVideogames)
    })
    .catch(error => next(error))
})
router.get('/:id', async (req, res, next) => {
    try {
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



router.post('/', async (req, res, next) => {
    
  

    const { name, description, platform} = req.body;
  
    const newGame = await Videogame.create({ 
        name,
        description,
        platform
    });
  
    res.send(newGame); 
    
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
