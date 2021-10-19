const API_URL =  "https://swapi.dev/api/films/?page=";
let pageEnCours = 1;


// function pour afficher les films et leur correspondances
async function getMovies() {
    const url = 'http://swapi.dev/api/films';
    const FILMS = await fetch(API_URL+pageEnCours);
    const FILM = await FILMS.json();
    const total_pages = FILM.count/FILM.results.length;

    // on vide le div
    document.getElementById('container').innerHTML = "";

    // boucle pour parser les films
    for(i=0;i<FILM.results.length;i++){
      const TITRE = FILM.results[i].title;
      const EPISODE = FILM.results[i].episode_id;
      const OPENING = FILM.results[i].opening_crawl;

    //   const planets = await fetch(people.results[i].homeworld);
    //   const planet = await planets.json();
      //console.log(hero+' '+planet.name);
      
      // variable pour la concatenation des films
      let movies = "";

      // boucle pour parser les films
    //   for(j=0;j<people.results[i].films.length;j++){
    //       const films = await fetch(people.results[i].films[j]);
    //       const film = await films.json();
    //       console.log(film.title);
    //       movies += `<p>${film.title}</p>`;
    //   }
      document.getElementById('container').innerHTML += `
          <p>
          <h2>${TITRE}</h2>
          <p>${EPISODE}</p>
          <p>${OPENING}</p>
          <p>${DIRECTOR}</p>
          <p>${PRODUCER}</p>
          <p>${DATE}</p>

          <button class="starships" value="${FILM.results[i].starships}">Voir les vaisseaux</button>
          <div id="detailsStarships${i}"></div>
          <button class="species" value="${FILM.results[i].species}">Voir les especes</button>
          <div id="detailsSpecies${i}"></div>
        

          </p>
          <hr>
          `;
      }

      const BUTTONS = document.querySelectorAll('.starships');
      for(var i = 0;i < BUTTONS.length;i++){
          let BUTTON = BUTTONS[i];
          BUTTON.addEventListener("click", function() {
               //console.log(BUTTON.nextElementSibling);
               getStarships(BUTTON.value,BUTTON.nextElementSibling.id);
        });
      }

      const BUTTONS1 = document.querySelectorAll('.species');
      for(var i =0; i<BUTTONS1.length; i++){
          let BUTTON1 = BUTTONS1[i];
          BUTTON1.addEventListener("click", function() {
              getSpecies(BUTTON1.value,BUTTON1.nextElementSibling.id);
          }
          );
      }

  }

// function pour afficher les vaisseaux
async function getStarships(liste,div) {
    const url = liste.split(',');
    console.log(div);
    document.getElementById(div).innerHTML = "";
    for(i=0;i<liste.length;i++){
        console.log(url[i]);
        const VAISSEAUX = await fetch(url[i]);
        const VAISSEAU = await VAISSEAUX.json();
        //console.log(film);

        document.getElementById(div).innerHTML += `<h2>${VAISSEAU.name}</h2>`;
    }


  }

async function getSpecies(liste,div){
    const url = liste.split(',');
    document.getElementById(div).innerHTML = "";
    for(i=0;i<liste.length;i++){
        const ESPECES = await fetch(url[i]);
        const ESPECE = await ESPECES.json();
        document.getElementById(div).innerHTML += `<h2>${ESPECE.name}</h2>`;
    }
}


// boucle pour afficher les boutons de navigations
fetch(API_URL)
    .then(response => response.json())
    .then(data => {

        let totalPages = data.count / data.results.length;
        for (let index = 1; index < totalPages +1; index++) {


            document.getElementById('buttons').innerHTML += `
            <button class="allButtons boutonNum" name="${index}" value="${index}"> ${index} </button>`;
        }

        let buttons = document.querySelectorAll('.allButtons');
        let boutonNum = document.querySelectorAll('.boutonNum');
        console.log(boutonNum);

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function(e) {

                if (e.target.name === "moins" || e.target.name === "plus"){

                    pageEnCours = pageEnCours + parseInt(e.target.value);

                    if(pageEnCours < 1){
                        pageEnCours = 1;
                    }else if(pageEnCours > boutonNum.length){
                        pageEnCours = boutonNum.length;
                    }

                }else{
                    pageEnCours = parseInt(e.target.value);
                }

                getMovies();
            });


}});

// initialisation de la page, pour un affichage au chargement
getMovies();
