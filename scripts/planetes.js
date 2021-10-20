const API_URL =  "https://swapi.dev/api/planets/?page=";
let pageEnCours = 1;


// function pour afficher les planetes et leur correspondances
async function getPlanets() {
    const PLANETS = await fetch(API_URL+pageEnCours);
    const PLANET = await PLANETS.json();
    const total_pages = PLANET.count/PLANET.results.length;

    // on vide le div
    document.getElementById('container').innerHTML = "";

    // boucle pour parser les planetes
    for(i=0;i<total_pages;i++){
      const PLANET_NAME = PLANET.results[i].name;
      const ROTATION_PERIOD = PLANET.results[i].rotation_period;
      const ORBITAL_PERIOD = PLANET.results[i].orbital_period;
      const DIAMETER =  PLANET.results[i].diameter;
      const CLIMATE = PLANET.results[i].climate;
      const GRAVITY = PLANET.results[i].gravity;
      const TERRAIN = PLANET.results[i].terrain;
      const SURFACE_WATER = PLANET.results[i].surface_water;
      const POPULATION = PLANET.results[i].population;

    
      document.getElementById('container').innerHTML += `
          <section class="card"> 
          <h2>${PLANET_NAME}</h2>
          <div class="data"> 
            <h3>Rotation :</h3> 
            <p>${ROTATION_PERIOD}</p>
          </div>
          <div>
            <h3>ORBITAL :</h3>
            <p>${ORBITAL_PERIOD}</p>
            </div>
          <div class="data">
            <h3>Diameter :</h3>
            <p>${DIAMETER}</p>
            </div>
          <div class="data">
            <h3>Climate :</h3>
            <p>${CLIMATE}</p>
            </div>
          <div class="data" >
            <h3>Gravity : </h3>
            <p>${GRAVITY}</p>
            </div>
          <div class="data" >
            <h3>Terrain :</h3>
            <p>${TERRAIN}</p>
            </div>
          <div class="data">
            <h3>Surface water : </h3>
            <p>${SURFACE_WATER}</p>
            </div>
          <div class="data">
            <h3>Population :</h3
            <p>${POPULATION}</p>
            </div>
          <div class="data">
            <button class="films" value="${PLANET.results[i].films}">Films</button>
            <div id="detailsFilms${i}"></div>
          </div>
          <div class="data">
            <button class="residents" value="${PLANET.results[i].residents}">Résidents</button>
            <div id="detailsResidents${i}"></div>
          </div>  
          </section>
        
          `;
      }
      const BUTTONS_FILMS = document.querySelectorAll('.films');
      for(var i = 0;i < BUTTONS_FILMS.length;i++){
          let BUTTON = BUTTONS_FILMS[i];
          BUTTON.addEventListener("click", function() {
               //console.log(BUTTON.nextElementSibling);
               getFilms(BUTTON.value,BUTTON.nextElementSibling.id);
               
        });
    }

    const BUTTONS_RESIDENTS = document.querySelectorAll('.residents');
      for(var i = 0;i < BUTTONS_RESIDENTS.length;i++){
          let BUTTON = BUTTONS_RESIDENTS[i];
          BUTTON.addEventListener("click", function() {
               //console.log(BUTTON.nextElementSibling);
               getResidents(BUTTON.value,BUTTON.nextElementSibling.id);
               
        });
    }
       
    
  }



// function pour afficher les films 
async function getFilms(liste,div) {
    const url = liste.split(',');
    console.log(div);
    document.getElementById(div).innerHTML = "";
    for(i=0;i<url.length;i++){
        console.log(url[i]);
        const FILMS = await fetch(url[i]);
        const FILM = await FILMS.json();
        //console.log(film);

        document.getElementById(div).innerHTML += `<p>${FILM.title}</p>`;
    }


  }

  
// function pour afficher les résidents 
async function getResidents(liste,div) {
    const url = liste.split(',');
    console.log(div);
    document.getElementById(div).innerHTML = "";
    for(i=0;i<url.length;i++){
        console.log(url[i]);
        const RESIDENTS = await fetch(url[i]);
        const RESIDENT = await RESIDENTS.json();
        //console.log(film);

        document.getElementById(div).innerHTML += `<p>${RESIDENT.name}</p>`;
    }


  }



// boucle pour afficher les boutons de navigation
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

                getPlanets();
            });


}});

// initialisation de la page, pour un affichage au chargement
getPlanets();
