movies=[];

document.addEventListener("DOMContentLoaded", function(){
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
        .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            console.log(data);
            movies = data
          })

        
    }
   
)
let contenedor=document.getElementById("lista");
let search = document.getElementById("inputBuscar");
let btnSearch= document.getElementById("btnBuscar");

function searching(movies) {
  contenedor.innerHTML = "";
  const filter = movies.filter(movie => movie.title.toLowerCase().includes(search.value.toLowerCase()) ||
    movie.overview.toLowerCase().includes(search.value.toLowerCase())|| movie.tagline.toLowerCase().includes(search.value.toLowerCase())
    || movie.genres.some(genre => (genre.name.toLowerCase() === search.value.toLowerCase())));
  if (filter.length === 0) {
    contenedor.innerHTML = "No hay resultado"
  } else {
    showMovies(filter)
  }
}

btnSearch.addEventListener('click', function () {
    if (search.value === ""){
        alert("Debe ingresar una película");
    }else{
        searching(movies);
    }
    
});

function showMovies(movies){
    for(let i=0; i<movies.length; i++){
        let str = "";
        for(j=0;j<movies[i].genres.length; j++){
            str+= movies[i].genres[j].name + "  ";
        }
        let contenido = document.createElement("li");
        contenido.className = "list-group-item"
        contenido.innerHTML = ` 
        <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop${movies[i].id}" aria-controls="offcanvasTop">${movies[i].title} - ${movies[i].tagline} </button>
        
        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop${movies[i].id}" aria-labelledby="offcanvasTopLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasTopLabel">${movies[i].title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
      ${movies[i].overview}
      <hr>
      ${str}
      </div>
      <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">More</button>
     <ul class="dropdown-menu">
         <li><p> Year:${movies[i].release_date.substring(0,4)}</p></li>
         <li><p> Runtime:${movies[i].runtime}</p></li>
         <li><p> Budget:$${movies[i].budget}</p></li>
         <li><p> Revenue:$${movies[i].revenue}</p></li>
    </ul>
    </div>
    </div>`
    
        for (let f = 0; f < 5; f++) {
            let elementSpan = document.createElement("span");
            elementSpan.classList.add("fa", "fa-star")
            if (f < movies[i].vote_average/2) {
                elementSpan.classList.add("checked")
            }
            contenido.appendChild(elementSpan)
        }
        contenedor.appendChild(contenido)
    }
}


