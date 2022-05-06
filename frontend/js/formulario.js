window.onload = () => {
  // Paso 1 - recupero cualquier pelicula para mostrarla en el formulario
  fetch("http://localhost:3031/api/movies/1/")
    .then(function (response) {
      return response.json();
    })
    .then(function (pelicula) {
      let data = pelicula.data;
      document.getElementById("title").value = data.title;
      document.getElementById("rating").value = parseFloat(data.rating);
      document.getElementById("awards").value = parseInt(data.awards);

      document.getElementById("genre_id").value = parseInt(data.genre_id);
      const date = new Date(data.release_date);
      document.getElementById("release_date").value = date
        .toISOString()
        .slice(0, 10);
      document.getElementById("length").value = data.length;
    })
    .catch(function (error) {
      console.error(error);
    });

  // Paso 2 - Enviar por put los datos para modificar la película
  document.querySelector("#btnEditar").addEventListener("click", function () {
    fetch("http://localhost:3031/api/movies/update/1/", {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
          title: document.getElementById("title").value, 
          rating: document.getElementById("rating").value,
          awards: document.getElementById("awards").value,
          release_date: document.getElementById("release_date").value,
          length: document.getElementById("length").value,
          genre_id: 5
        }),
    })
      .then((res) => res.json())
      .then((res) => {
        location.replace("/frontend/home.html");
      });
  });

  // Paso 3 - Enviar por post los datos para crear una película
  document.getElementById("btnCrear").addEventListener("click", function () {
    fetch("http://localhost:3031/api/movies/create", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Accept": "*/*"
      },
      body: JSON.stringify({ 
          title: document.getElementById("title").value, 
          rating: document.getElementById("rating").value,
          awards: document.getElementById("awards").value,
          release_date: document.getElementById("release_date").value,
          length: document.getElementById("length").value,
          genre_id: 5
        }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.replace("/frontend/home.html");
      });
  });
  // Paso 4 - Eliminar una película
  document.getElementById("btnEliminar").addEventListener("click", function () {
    fetch("http://localhost:3031/api/movies/delete/1/", {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  });
};

