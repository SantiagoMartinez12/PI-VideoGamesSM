

const {axios} = require("axios");
require("dotenv").config();
const { KEY } = process.env;
const URL =`https://api.rawg.io/api/games?key=${KEY}`;

// let response = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&limit=100`))
// apiVideogames=response.data.results
// console.log(apiVideogames)

const getGame = async () => { 
    let apiGame = [];   // creo array vacio para traer info de api
// tengo que traer 100 resultados--- si no CA-BOOM!!! 
    try { 

        let page1 = (await axios.get(`${URL}&page_size=50`)).data; // aca traigo 50 

        let page2 = (await axios.get(page1.next)).data; // aca traigo 50 mas 

        let resultado = Promise.all([page1,page2])
        .then((resolve) => {
            let [p1, p1] = resolve;
            apiGame = [...p1.resultado,...p2.resultado].map( 
                (e) => {
                    let dataGame = {
                        id: e.id,
                        name: e.name,
                        background_image: e.background_image,
                        rating: e.rating,
                        relaseDate: e.relaseDate,
                        genre: e.genre,


                    } 
                }
            )
        })

    }
}  