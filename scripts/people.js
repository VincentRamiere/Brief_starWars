const API_URL =  "https://swapi.dev/api/people/?page=";
let pageEnCours = 1;


// function pour afficher les peoples et leur correspondances
async function getPeople() {
    const url = 'http://swapi.dev/api/people';
    const peoples = await fetch(API_URL+pageEnCours);
    const people = await peoples.json();
    const total_pages = people.count/people.results.length;

    // on vide le div
    document.getElementById('container').innerHTML = "";

    // boucle pour parser les peoples
    for(i=0;i<total_pages;i++){
      const hero = people.results[i].name;
      const planets = await fetch(people.results[i].homeworld);
      const planet = await planets.json();
      //console.log(hero+' '+planet.name);
      
      // variable pour la concatenation des films
      let movies = "";

      // boucle pour parser les films
      for(j=0;j<people.results[i].films.length;j++){
          const films = await fetch(people.results[i].films[j]);
          const film = await films.json();
          console.log(film.title);
          movies += `<p>${film.title}</p>`;
      }
      document.getElementById('container').innerHTML += `
          <p>
          <h2>${hero}</h2>
          <h3>planet : ${planet.name} <span style="font-size:12px;">(${people.results[i].homeworld})</span></h3>
          <h4>Films : ${movies}</h4>
          </p>
          <hr>
          `;
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

// initialisation de la page, pour un affichage au chargement
getPeople();