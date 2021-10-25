const { Router } = require('express');


const router = Router();


router.get('/', (req, res, next) => {
    res.send('soy get /genregame')
});

router.post('/', (req, res, next) => {
    res.send('soy post /genregame')
});


router.put('/', (req, res, next) => {
    res.send('soy put /genregame')
});


router.delete('/', (req, res, next) => {
    res.send('soy delete /genregame')
});


module.exports = router;
