import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


document.querySelector('#app').innerHTML = `
  <h1 class="text-center mb-5 mt-5">Aplicación para obtener los personajes de la API de Rick and Morty</h1>
  <section class="container" id="characters-container">
  </section>
`
let html = document.createElement('div')
html.setAttribute('class', 'row')
const getChraracters = async () => {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    const data = await response.json()

    console.log(data.results);

    data.results.map((character) => {
      console.log(character.name);
      let status = ""
      if (character.status == 'Alive') {
        status = "btn-success"
      } else if (character.status == 'Dead') {
        status = "btn-danger"
      } else {
        status = "btn-warning"
      }
      html.innerHTML   += `
      <div class="col-sm-12 col-md-4 p-2">
          <div class="card" style="width: 18rem;">
            <img src="${character.image}" class="card-img-top" alt="image of ${character.name}">
            <div class="card-body">
              <h5 class="card-title">Name: ${character.name}</h5>
              <p class="card-text">Species: ${character.species}<br>Gender: ${character.gender}</p>
              <a href="#" class="btn btn-primary ${status}" id="status">${character.status}</a>
            </div>
          </div>
        </div>
      `
      document.querySelector('#characters-container').appendChild(html)
    })
  } catch (error) {
    console.log("Something is wrong whit the app", error);
  }
}

getChraracters()