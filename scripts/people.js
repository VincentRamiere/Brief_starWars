const API_URL =  "https://swapi.dev/api/people/?page=";
let pageEnCours = 1;


// function pour afficher les peoples et leur correspondances
async function getPeople() {
    const peoples = await fetch(API_URL+pageEnCours);
    const people = await peoples.json();
    const total_pages = people.count/people.results.length;

    // on vide le div
    document.getElementById('container').innerHTML = "";

    // boucle pour parser les peoples
    for(i=0;i<total_pages;i++){
      const hero = people.results[i].name;
    //   const planets = await fetch(people.results[i].homeworld);
    //   const planet = await planets.json();
      //console.log(hero+' '+planet.name);
      
      // variable pour la concatenation des films
      //let movies = "";

      // boucle pour parser les films
    //   for(j=0;j<people.results[i].films.length;j++){
    //       const films = await fetch(people.results[i].films[j]);
    //       const film = await films.json();
    //       console.log(film.title);
    //       movies += `<p>${film.title}</p>`;
    //   }
      document.getElementById('container').innerHTML += `
        <section class="card">
        <h2>Name : ${hero}</h2>
            <div class="data"> 
                <h3>Height :</h3> 
                <p>${people.results[i].height} cm</p>
            </div>
            <div class="data"> 
                <h3>Weight :</h3> 
                <p>${people.results[i].mass} Kg</p>
            </div>
            <div class="data"> 
                <h3>Hair color :</h3> 
                <p>${people.results[i].hair_color}</p>
            </div>
            <div class="data"> 
                <h3>Skin color :</h3> 
                <p>${people.results[i].skin_color}</p>
            </div>
            <div class="data"> 
                <h3>Eye color :</h3> 
                <p>${people.results[i].eye_color}</p>
            </div>
            <div class="data"> 
                <h3>Birth year :</h3> 
                <p>${people.results[i].birth_year}</p>
            </div>
            <div class="data"> 
                <h3>Gender :</h3> 
                <p>${people.results[i].gender}</p>
            </div>            

            <button class="films" value="${people.results[i].films}">Voir les films</button>
            <div id="detailsFilms${i}"></div>
        </section>
          `;
      }
      const BUTTONS = document.querySelectorAll('.films');
      for(var i = 0;i < BUTTONS.length;i++){
          let BUTTON = BUTTONS[i];
          BUTTON.addEventListener("click", function() {
               //console.log(BUTTON.nextElementSibling);
               getFilms(BUTTON.value,BUTTON.nextElementSibling.id);
        });
      }
  }

// function pour afficher les peoples et leur correspondances
async function getFilms(liste,div) {
    let url = liste.split(',');
    console.log(url);
    document.getElementById(div).innerHTML = "";
    for(i=0;i<url.length;i++){
        console.log(url[i]);
        const films = await fetch(url[i]);
        const film = await films.json();
        //console.log(film);

        document.getElementById(div).innerHTML += `<h2>${film.title}</h2>`;
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

                getPeople();
            });


}});

var array = ["Luke Skywalker", "Anakin Skywalker", "Dark Vador"];
function myFunction() {
    // Declare variables
    let query = myInput.value;
    let result = array.filter(user=>user.includes(query));
    document.getElementById('container').innerHTML = "";
    for(i=0;i<result.length;i++){
        document.getElementById('container').innerHTML += `<p>${result[i]}</p>`;
    }

    console.log(result);
  
  }


// initialisation de la page, pour un affichage au chargement
//getPeople();
