const { Router } = require('express');
const {Videogame} = require('../db')
const router = Router();


router.get('/', (req, res, next) => {
    return Videogame.findAll()
    .then((videogame) => {
        res.send(videogame)
    })
    .catch((err) => {next(error)})
    
});

router.post('/', async (req, res, next) => {
    console.log("hola");
    console.log(req.body)
   const { name, description, platform} = req.body;
   console.log(req.body)
   const newGame = await Videogame.create({ 
    name,
    description,
    platform
        });
        console.log("hola");
        console.log(newGame);
        res.send(newGame);
});


router.put('/', (req, res, next) => {
    res.send('soy put /videogame')
});


router.delete('/', (req, res, next) => {
    res.send('soy delete /videogame')
});


module.exports = router;
