const API_URL =  "https://swapi.dev/api/films/?page=";
let pageEnCours = 1;


// Fonction pour afficher les films et leur correspondances
async function getMovies() {
    const url = 'http://swapi.dev/api/films';
    const FILMS = await fetch(API_URL+pageEnCours);
    const FILM = await FILMS.json();
    const total_pages = FILM.count/FILM.results.length;

    // On vide le container
    document.getElementById('container').innerHTML = "";

    // Boucle pour parser les films
    for(i=0;i<FILM.results.length;i++){
        const TITRE = FILM.results[i].title;
        const EPISODE = FILM.results[i].episode_id;
        const OPENING = FILM.results[i].opening_crawl;
        const DIRECTOR = FILM.results[i].director;
        const PRODUCER = FILM.results[i].producer;
        const DATE = FILM.results[i].release_date;

    // Variable pour la concatenation des films
    let movies = "";

    // Boucle pour parser les films
    document.getElementById('container').innerHTML += `
        <section class="card">
            <h2 style="display: inline;">${TITRE}</h2> <a href="#" class="etendre">+</a>
            <div class="details">
                <div class="data">
                    <h3> Episode ID : </h3>
                    <p>${EPISODE}</p>
                </div>

                <div class="data">
                    <h3> Opening Crawl : </h3>
                    <p>${OPENING}</p>
                </div>

                <div class="data">
                    <h3>Director : </h3>
                    <p>${DIRECTOR}</p>
                </div>

                <div class="data">
                    <h3>Producer(s) :</h3>
                    <p> ${PRODUCER}</p>
                </div>

                <div class="data">
                    <h3>Release Date :</h3>
                    <p>${DATE}</p>
                </div>

                <div class="data">
                    <button class="starships" value="${FILM.results[i].starships}">Voir les vaisseaux +</button>
                    <div id="detailsStarships${i}"></div>
                </div>

                <div class="data">
                    <button class="species" value="${FILM.results[i].species}">Voir les especes +</button>
                    <div id="detailsSpecies${i}"></div>
                </div>
            </div>
        </section>
    `;
    }

    // Bouton pour l'affichage des vaiseaux
    const BUTTONS = document.querySelectorAll('.starships');
        for(var i = 0;i < BUTTONS.length;i++){
            let BUTTON = BUTTONS[i];
            BUTTON.addEventListener("click", function() {
            getStarships(BUTTON.value,BUTTON.nextElementSibling.id);
            });
        }

    // Bouton pour l'affichage des espèces
    const BUTTONS1 = document.querySelectorAll('.species');
        for(var i =0; i<BUTTONS1.length; i++){
            let BUTTON1 = BUTTONS1[i];
            BUTTON1.addEventListener("click", function() {
            getSpecies(BUTTON1.value,BUTTON1.nextElementSibling.id);
            });
        }

        const accordion = document.getElementsByClassName('etendre');
        for (i=0; i<accordion.length; i++) {
            accordion[i].addEventListener('click', function (e) {
                e.preventDefault();
                //console.log('this.nextElementSibling');
                this.nextElementSibling.classList.toggle('active');
          });
        }
}

// Fonction pour afficher les vaisseaux
async function getStarships(liste,div) {
    const url = liste.split(',');
    console.log(div);
    document.getElementById(div).innerHTML = "";
    for(i=0;i<liste.length;i++){
        console.log(url[i]);
        const VAISSEAUX = await fetch(url[i]);
        const VAISSEAU = await VAISSEAUX.json();

        document.getElementById(div).innerHTML += `<p>${VAISSEAU.name}</p>`;
    }
}

// Fonction pour afficher les espèces
async function getSpecies(liste,div){
    const url = liste.split(',');
    document.getElementById(div).innerHTML = "";
    for(i=0;i<liste.length;i++){
        const ESPECES = await fetch(url[i]);
        const ESPECE = await ESPECES.json();

        document.getElementById(div).innerHTML += `<p>${ESPECE.name}</p>`;
    }
}


// Boucle pour afficher les boutons de navigations
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

// Initialisation de la page, pour un affichage au chargement
getMovies();
