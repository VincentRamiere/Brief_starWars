const FILMS = document.getElementById('container');
const API_URL = "https://swapi.dev/api/films";


fetch(API_URL)
.then((reponse) => {
    //console.log(reponse);
    return reponse.json()
})
.then(reponseFormat => {
    for(let index = 0; index <6; index++){
        //console.log(reponseFormat.results[index]);
        const data = reponseFormat.results[index];
        console.log(data);
    
        FILMS.innerHTML +=`
        <p div class="films">${data.title}</p>
        <p div id="episode_id">${data.episode_id}</p>
        <p div id="opening_crawl">${data.opening_crawl}</p>
        <p div id="director">${data.director}</p>
        <p div id="producer">${data.producer}</p>
        <p div id="release_date">${data.release_date}</p>
        <p div id="starships">${data.starships}</p>
        <p div id="species">${data.starships}</p>
        <hr>`
}
})