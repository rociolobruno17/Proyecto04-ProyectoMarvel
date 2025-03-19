const $ = (element) => document.querySelector(element);
const $$ = (element) => document.querySelectorAll(element);

const ts = Date.now()
const publicKey = `6f6d2c7a1abc8312a3b896f5c1ed2bb0`
const privateKey = `28bca8a637892d214f58b3969dbf9eed377aaa09`
const hash = md5(`${ts}${privateKey}${publicKey}`)


const $inputTextoBuscar = $("#texto-buscar");
const $botonBuscar = $("#boton-buscar");
const $contenedorComics = $("#contenedor-comics");
const $selectFiltroTipo = $("#select-filtro-tipo");



/////////////////////// Evento para que aparezcan comics ni bien se carga la pagina ///////////////////////


document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get(`https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
    console.log(response.data);
    const comics = response.data.data.results;
    pintarDatos(comics);
  } catch (error) {
    console.error("Error al cargar cómics aleatorios:", error);
  }
});





/////////////////////// Buscar comic ///////////////////////

$botonBuscar.addEventListener("click", async () => {
  const textoBuscar = $inputTextoBuscar.value.trim();

  try {
    const response = await axios.get(`https://gateway.marvel.com/v1/public/comics?titleStartsWith=${textoBuscar}&ts=${ts}&apikey=${publicKey}&hash=${hash}`);
    console.log(response.data);
    const comics = response.data.data.results;
    pintarDatos(comics);
  } catch (error) {
    console.error("Error en la búsqueda de cómics:", error);
  }
});

// /////////////////////// Resultado de comic buscado ///////////////////////
// function pintarDatos(comics) {
//   $contenedorComics.innerHTML = "";
//   for (const comic of comics) {
//     const imageUrl = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
//     $contenedorComics.innerHTML += `
//       <div class="flex flex-wrap justify-around">
//         <div class="m-4 p-4 bg-white rounded-lg shadow-md">
//           <img src="${imageUrl}" alt="${comic.title}" class="w-full h-64 object-cover rounded-lg">
//           <h3 class="mt-2 text-lg font-semibold">${comic.title}</h3>
//         </div>
//       </div>`;
//   }
// }


/////////////////////// Buscar personaje ///////////////////////

$selectFiltroTipo.addEventListener("input", async () => {
  const textoBuscar = $inputTextoBuscar.value.trim();

  try {
    const response = await axios.get(`https://gateway.marvel.com/v1/public/characters`, {
      params: {
        nameStartsWith: textoBuscar,
        ts,
        apikey: publicKey,
        hash,
        limit: 20,
      },
    });
    console.log(response.data); 
    const personajes = response.data.data.results;
    pintarDatos(personajes);
  } catch (error) {
    console.error("Error en la búsqueda de personajes:", error);
  }
});


///////////////// Función para pintar datos de busqueda ///////////////////////

function pintarDatos(datos) {
  $contenedorComics.innerHTML = "";
  for (const item of datos) {
    const imageUrl = `${item.thumbnail.path}.${item.thumbnail.extension}`;
    $contenedorComics.innerHTML += `
      <div class="flex flex-wrap justify-around">
        <div class="m-4 p-4 bg-white rounded-lg shadow-md">
          <img src="${imageUrl}" alt="${item.title || item.name}" class="w-full h-64 object-cover rounded-lg">
          <h3 class="mt-2 text-lg font-semibold">${item.title || item.name}</h3>
        </div>
      </div>`;
  }
}











// $botonBuscar.addEventListener("click", () => {
//      const textoBuscar = $inputTextoBuscar.value.trim();
//      if (!textoBuscar) return alert("Por favor, ingresa un nombre para buscar.");
  
//      fetch(`https://gateway.marvel.com/v1/public/comics?titleStartsWith=${textoBuscar}&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
//        .then(response => response.json())
//        .then(data => {
//          console.log(data); // Ver los resultados en la consola
//          const comics = data.data.results;
//          pintarDatos(comics);
//        })
//        .catch(error => console.error("Error en la búsqueda de cómics:", error));
//    });
  


//    function pintarDatos(comics) {
//      $contenedorComics.innerHTML = "";
//      for (const comic of comics) {
//        const imageUrl = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
//        $contenedorComics.innerHTML += `
//        <div class="flex flex-wrap justify-around">
//          <div class="m-4 p-4 bg-white rounded-lg shadow-md">
//            <img src="${imageUrl}" alt="${comic.title}" class="w-full h-64 object-cover rounded-lg">
//            <h3 class="mt-2 text-lg font-semibold">${comic.title}</h3>
//          </div>
//          </div>`;
//      }
//    }




// fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.log(error))