
function miCalificacion(id, calif) {
  
  let datos = localStorage.getItem('datos');
  if(datos !== null) {
    let arr = datos.split(',');
    arr.push(id);
    localStorage.setItem('datos', arr);
  } else {
    localStorage.setItem('datos', id);
  }
  
}

function favoritas(id) {
  return '<div class="ec-stars-wrapper">' +
  `<a href="#" onclick="miCalificacion(${id},1)">&#9733;</a>`+
'</div>'
}

window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  if(localStorage.getItem('datos') !== null) {
    const link = document.getElementById("favoritas");
    link.innerHTML = '<a href="favoritas.html">Favoritas</a>';
  }

  fetch("http://localhost:3031/api/movies/")
    .then(function (response) {
      return response.json();
    })
    .then(function (peliculas) {
      let data = peliculas.data;
      
      data.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;
        

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        container.appendChild(card);
        card.appendChild(h1);
       
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        const favoritas = document.createElement("p");
        favoritas.innerHTML = this.favoritas(movie.id);
        
        card.appendChild(duracion)
        card.appendChild(favoritas)
      });
    })
    .catch(function (error) {
      console.error(error);
    });
};
