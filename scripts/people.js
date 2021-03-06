const API_URL =  "https://swapi.dev/api/people/?page=";
let pageEnCours = 1;
let tableau_perso = new Array();

class People {
    constructor(name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld, index, films) {
        this.name = name;
        this.height = height;
        this.mass = mass;
        this.hair_color = hair_color;
        this.skin_color = skin_color;
        this.eye_color = eye_color;
        this.birth_year = birth_year;
        this.gender = gender;
        this.homeworld = homeworld;
        this.index = index;
        this.films = films;
    }

    affichePeople () {
        document.getElementById('container').innerHTML += `
        <section class="card">
            <h2 style="display: inline;">${this.name} </h2><a href="#" class="etendre">+</a>
            <div class="details">
            <div class="data"> 
                <h3>Né sur :</h3> 
                <p>${this.homeworld}</p>
            </div>
            <div class="data"> 
                <h3>Height :</h3> 
                <p>${this.height} cm</p>
            </div>
            <div class="data"> 
                <h3>Weight :</h3> 
                <p>${this.mass} Kg</p>
            </div>
            <div class="data"> 
                <h3>Hair color :</h3> 
                <p>${this.hair_color}</p>
            </div>
            <div class="data"> 
                <h3>Skin color :</h3> 
                <p>${this.skin_color}</p>
            </div>
            <div class="data"> 
                <h3>Eye color :</h3> 
                <p>${this.eye_color}</p>
            </div>
            <div class="data"> 
                <h3>Birth year :</h3> 
                <p>${this.birth_year}</p>
            </div>
            <div class="data"> 
                <h3>Gender :</h3> 
                <p>${this.gender}</p>
            </div>            
            <div class="data">
                <button class="films" value="${this.films}">Voir les films +</button>
                <div id="detailsFilms${this.index}"></div>
            </div>
            </div>
        </section>
        `;
    }
}

// function pour afficher les peoples et leur correspondances
async function getPeople() {
    const peoples = await fetch(API_URL+pageEnCours);
    const people = await peoples.json();
    const total_pages = people.count/people.results.length;
    tableau_perso = [];

    // on vide le div
    document.getElementById('container').innerHTML = "";

    // boucle pour parser les peoples
    for(i=0;i<people.results.length;i++){
      const hero = people.results[i].name;
      const planets = await fetch(people.results[i].homeworld);
      const planet = await planets.json();
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
            tableau_perso.push({name:people.results[i].name,height:people.results[i].height,mass:people.results[i].mass,hair_color:people.results[i].hair_color,skin_color:people.results[i].skin_color,eye_color:people.results[i].eye_color,birth_year:people.results[i].birth_year,gender:people.results[i].gender,homeworld:planet.name,index:i,films:people.results[i].films});
            const perso = new People(people.results[i].name,people.results[i].height,people.results[i].mass,people.results[i].hair_color,people.results[i].skin_color,people.results[i].eye_color,people.results[i].birth_year,people.results[i].gender,planet.name,i,people.results[i].films);
            perso.affichePeople();
      }
        const BUTTONS = document.querySelectorAll('.films');
        for(var i = 0;i < BUTTONS.length;i++){
            let BUTTON = BUTTONS[i];
            BUTTON.addEventListener("click", function() {
                //console.log(BUTTON.nextElementSibling);
                getFilms(BUTTON.value,BUTTON.nextElementSibling.id);
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

// function pour afficher les peoples et leur correspondances
async function getFilms(liste,div) {
    let url = liste.split(',');
    console.log(url);
    document.getElementById(div).innerHTML = "";
    for(i=0;i<url.length;i++){
        //console.log(url[i]);
        const films = await fetch(url[i]);
        const film = await films.json();
        //console.log(film);

        document.getElementById(div).innerHTML += `<p>${film.title}</p>`;
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

document.getElementById('myInput').addEventListener("keyup", function() {
    searchPeople();
});

function searchPeople() {
    // Declare variables
    let query = myInput.value;
    // if(query.length>1){
    //     getSearch(query);
    // }else{
    //     getPeople();
    // }
    //console.log(tableau_perso);
    let results = tableau_perso.filter(user=>user.name.includes(query));
    //console.log(result);
    document.getElementById('container').innerHTML = "";
    for(i=0;i<results.length;i++){
        //document.getElementById('container').innerHTML += `<p>${result[i].name}</p>`;
        const perso = new People(results[i].name,results[i].height,results[i].mass,results[i].hair_color,results[i].skin_color,results[i].eye_color,results[i].birth_year,results[i].gender,results[i].homeworld,i,results[i].films);
        perso.affichePeople();

        const accordion = document.getElementsByClassName('etendre');
        for (i=0; i<accordion.length; i++) {
            accordion[i].addEventListener('click', function (e) {
                e.preventDefault();
                //console.log('this.nextElementSibling');
                this.nextElementSibling.classList.toggle('active');
          });
        }
    }
  }


// async function getSearch() {
//     document.getElementById('container').innerHTML = "";
//         const searchs = await fetch("https://swapi.dev/api/people/?search="+query);
//         const search = await searchs.json();
//         console.log(search);
//         for(i=0;i<search.count;i++){
//           const planets = await fetch(search.results[i].homeworld);
//           const planet = await planets.json();
            
//             const perso = new People(search.results[i].name,search.results[i].height,search.results[i].mass,search.results[i].hair_color,search.results[i].skin_color,search.results[i].eye_color,search.results[i].birth_year,search.results[i].gender,planet.name,i,search.results[i].films);
//             perso.affichePeople();
//         }
//           const BUTTONS = document.querySelectorAll('.films');
//           for(var i = 0;i < BUTTONS.length;i++){
//               let BUTTON = BUTTONS[i];
//               BUTTON.addEventListener("click", function() {
//                    //console.log(BUTTON.nextElementSibling);
//                    getFilms(BUTTON.value,BUTTON.nextElementSibling.id);
//             });
//           }

//         const accordion = document.getElementsByClassName('etendre');
//         for (i=0; i<accordion.length; i++) {
//             accordion[i].addEventListener('click', function () {
//                 //console.log('this.nextElementSibling');
//                 this.nextElementSibling.classList.toggle('active');
//           });
//         }


//   }

// initialisation de la page, pour un affichage au chargement
getPeople();
