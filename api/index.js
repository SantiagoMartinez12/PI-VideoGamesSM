//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {GenreGame} = require('./src/db');
const { default: axios } = require('axios');
const { KEY } = process.env;


// Syncing all the models at once.
// hacer get de generos 
conn.sync({ force: true })
.then(async () => {
let temp = await GenreGame.findAll();

if(temp.length === 0) {
   //const URL = `https://api.rawg.io/api/genres?key=${KEY}`
   try {
     const response = await axios.get(`https://api.rawg.io/api/genres?key=${KEY}`);
    // const getGene = axios.get(`https://api.rawg.io/api/genres?key=${KEY}`);
    const resulGene = response.data?.results.sort((a,b) => {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });
    
    
     resulGene && resulGene.map(async (genre)=>{
       await GenreGame.findOrCreate({
         where: { name: genre.name}
       });
     });
   } catch (err) {
     console.error(err);
   }
}

  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

