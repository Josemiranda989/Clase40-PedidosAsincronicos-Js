window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

  let str = localStorage.getItem('datos');
  let arr = str.split(',');
  let favoritas = Array.from(new Set(arr))
  favoritas.forEach((id) => {
    fetch(`http://localhost:3031/api/movies/${id}/`)
      .then(function (response) {
        return response.json();
      })
      .then(function (peli) {
        let movie = peli.data;
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
          
          card.appendChild(duracion);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
};
