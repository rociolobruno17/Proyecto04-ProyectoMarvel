const $ = (element) => document.querySelector(element);
const $$ = (element) => document.querySelectorAll(element);

const API_BASE_URL = "https://rickandmortyapi.com/api";

const $inputTextoBuscar = $("#texto-buscar");
const $botonBuscar = $("#boton-buscar");
const $contenedorResultados = $("#contenedor-resultados");
const $selectFiltroTipo = $("#select-filtro-tipo");
const $selectFiltroStatus = $("#select-filtro-status");
const $selectFiltroGender = $("#select-filtro-gender");
const $botonAnterior = $("#pagina-anterior");
const $botonSiguiente = $("#pagina-siguiente");
const $contenedorPaginacion = $("#contenedor-paginacion");

const $detallePersonaje= $("#detalle-personaje");
const $cerrarDetalle= $("#cerrar-detalle");
const $detalleContenido= $("#detalle-contenido");




let paginaActual = 1;
let filtroActual = "character"; // Por defecto, busca personajes


/////////////////////// Carga inicial con personajes aleatorios ///////////////////////
document.addEventListener("DOMContentLoaded", async () => {

  $contenedorResultados.innerHTML = `<div class="loader"></div>`

  try {

    $contenedorResultados.innerHTML = ``

    const response = await axios.get(`${API_BASE_URL}/character`);
    const personajes = response.data.results;
    pintarDatos(personajes);

  } catch (error) {
    $contenedorResultados.innerHTML = ``

    console.error("Error al cargar personajes aleatorios:", error);
  }
});

/////////////////////// Buscar personajes o episodios ///////////////////////
$botonBuscar.addEventListener("click", async () => {
  
  $contenedorResultados.innerHTML = `<div class="loader"></div>`

  const textoBuscar = $inputTextoBuscar.value.trim();
  const tipoBusqueda = $selectFiltroTipo.value;
  let url = "";

  if (tipoBusqueda === "episodios") {
    url = `${API_BASE_URL}/episode/?name=${textoBuscar}`;
  } else {
    url = `${API_BASE_URL}/character/?name=${textoBuscar}`;
  }


  try {


    const response = await axios.get(url);
    const resultados = response.data.results;

    $contenedorResultados.innerHTML = ``

    pintarDatos(resultados);
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    $contenedorResultados.innerHTML = ``
    $contenedorResultados.innerHTML = `<div class="flex items-center justify-center gap-4 p-6">
      <img src="./error.png" alt="Error" class="w-96 h-96 object-contain">
      <div>
        <h1 class="text-6xl font-black text-gray-800 xl:text-[40px]">OOPS...</h1>
        <p class="text-3xl font-bold text-gray-800 xl:text-[20px]">Parece que falta algo :(</p>
        <p class="text-xl font-light text-gray-800 xl:text-[20px]">Es posible que haya escrito mal la búsqueda o que la página se haya movido</p>
        <div class="flex gap-4 mt-4 text-xs text-gray-800 w-96 justify-start">
          <button class="px-6 py-2 border border-green-500 text-green-500 font-semibold rounded-lg shadow-sm hover:bg-green-500 hover:text-white focus:outline-none transition">Volver al inicio</button>
          <button class="hover:underline eliminar-boton">Contactar con soporte</button>
          </div>
      </div>
    </div>`;
  }
});

/////////////////////// Filtrar personajes por status y gender ///////////////////////
$selectFiltroStatus.addEventListener("change", aplicarFiltros);
$selectFiltroGender.addEventListener("change", aplicarFiltros);

async function aplicarFiltros() {
  const status = $selectFiltroStatus.value;
  const gender = $selectFiltroGender.value;
  let url = `${API_BASE_URL}/character/?`;

  if (status !== "all") url += `status=${status}&`;
  if (gender !== "all") url += `gender=${gender}`;

  try {
    const response = await axios.get(url);
    const personajes = response.data.results;
    pintarDatos(personajes);
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    $contenedorResultados.innerHTML = ``
    $contenedorResultados.innerHTML = `<div class="flex items-center justify-center gap-4 p-6">
      <img src="./error.png" alt="Error" class="w-96 h-96 object-contain">
      <div>
        <h1 class="text-6xl font-black text-gray-800 xl:text-[40px]">OOPS...</h1>
        <p class="text-3xl font-bold text-gray-800 xl:text-[20px]">Parece que falta algo :(</p>
        <p class="text-xl font-light text-gray-800 xl:text-[20px]">Es posible que haya escrito mal la búsqueda o que la página se haya movido</p>
        <div class="flex gap-4 mt-4 text-xs text-gray-800 w-96 justify-start">
          <button class="px-6 py-2 border border-green-500 text-green-500 font-semibold rounded-lg shadow-sm hover:bg-green-500 hover:text-white focus:outline-none transition">Volver al inicio</button>
          <button class="hover:underline eliminar-boton">Contactar con soporte</button>
          </div>
      </div>
    </div>`;
  }
}

// /////////////////////// Función para pintar los datos ///////////////////////
// function pintarDatos(datos) {
//   $contenedorResultados.innerHTML = "";
  
//   for (const item of datos) {
//     const imageUrl = item.image ? item.image : "https://via.placeholder.com/200";
//     const name = item.name || "Desconocido";
//     const subtitle = item.episode ? `Episodios: ${item.episode.length}` : `Estado: ${item.status}`;

//     $contenedorResultados.innerHTML += `
//       <div class="m-4 p-4 bg-white rounded-lg shadow-md">
//         <img src="${imageUrl}" alt="${name}" class="w-full h-64 object-cover rounded-lg">
//         <h3 class="mt-2 text-lg font-semibold">${name}</h3>
//         <p class="text-gray-600">${subtitle}</p>
//       </div>`;
//   }
// }

// /////////////////////// Función para pintar los datos diferenciando entre episodio y personaje ///////////////////////


function pintarDatos(datos) {
  $contenedorResultados.innerHTML = "";

  for (const item of datos) {
    const isCharacter = item.hasOwnProperty("image");

    if (isCharacter) {
      const imageUrl = item.image ? item.image : "https://via.placeholder.com/200";
      const name = item.name || "Desconocido";
      const status = item.status || "Estado desconocido";
      const species = item.species || "Especie desconocida";

      $contenedorResultados.innerHTML += `
        <div class="m-12 p-4 bg-white rounded-lg shadow-md cursor-pointer character-card" data-id="${item.id}">
          <img src="${imageUrl}" alt="${name}" class="w-full h-64 object-cover rounded-lg">
          <h3 class="mt-4 text-3xl font-bold text-gray-800">${name}</h3>
          <p class="text-gray-600">Estado: ${status}</p>
          <p class="text-gray-600">Especie: ${species}</p>
        </div>`;
    } else {
      // Si es un episodio
      const name = item.name || "Desconocido";
      const episodeCode = item.episode || "Código no disponible";
      const airDate = item.air_date || "Fecha no disponible";

      $contenedorResultados.innerHTML += `
        <div class="m-12 p-4 bg-white rounded-lg shadow-md">
          <h3 class="text-3xl font-bold text-gray-800">${name}</h3>
          <p class="text-gray-600">Episodio: ${episodeCode}</p>
          <p class="text-gray-600">Fecha de emisión: ${airDate}</p>
        </div>`;
    }
  }

  // Agregar evento de clic a los personajes
  document.querySelectorAll(".character-card").forEach(card => {
    card.addEventListener("click", async (event) => {
      const characterId = event.currentTarget.dataset.id;
      mostrarDetalle(characterId);
    });
  });
}









/////////////////////// Evento para ir a pagina siguiente o pagina anterior ///////////////////////


// Evento para cambiar el tipo de búsqueda (Personajes o Episodios)
$selectFiltroTipo.addEventListener("change", () => {
  filtroActual = $selectFiltroTipo.value === "episodios" ? "episode" : "character";
  paginaActual = 1; // Reiniciar a la primera página cuando se cambia el tipo
  obtenerDatos(paginaActual);
});

// Eventos de paginación
$botonSiguiente.addEventListener("click", () => {
  paginaActual += 1;
  obtenerDatos(paginaActual);
});

$botonAnterior.addEventListener("click", () => {
  if (paginaActual > 1) {
    paginaActual -= 1;
    obtenerDatos(paginaActual);
  }
});

///////////////////////// Función para obtener datos de personajes o episodios ///////////////////////
async function obtenerDatos(page) {
  let url =  `${API_BASE_URL}/${filtroActual}?page=${page}`;

  try {
    const response = await axios.get(url);
    const datos = response.data.results;
    pintarDatos(datos);
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    $contenedorResultados.innerHTML = ``
    $contenedorResultados.innerHTML = `<div class="flex items-center justify-center gap-4 p-6">
      <img src="./error.png" alt="Error" class="w-96 h-96 object-contain">
      <div>
        <h1 class="text-6xl font-black text-gray-800 xl:text-[40px]">OOPS...</h1>
        <p class="text-3xl font-bold text-gray-800 xl:text-[20px]">Parece que falta algo :(</p>
        <p class="text-xl font-light text-gray-800 xl:text-[20px]">Es posible que haya escrito mal la búsqueda o que la página se haya movido</p>
        <div class="flex gap-4 mt-4 text-xs text-gray-800 w-96 justify-start">
          <button class="px-6 py-2 border border-green-500 text-green-500 font-semibold rounded-lg shadow-sm hover:bg-green-500 hover:text-white focus:outline-none transition">Volver al inicio</button>
          <button class="hover:underline eliminar-boton">Contactar con soporte</button>
          </div>
      </div>
    </div>`;
  }
}


// async function mostrarDetalle(id) {
//   $contenedorResultados.style.display = "none"; // Oculta los resultados
//   $detallePersonaje.style.display = "block"; // Muestra los detalles


//   try {
//     const response = await axios.get(`${API_BASE_URL}/character/${id}`);
//     const character = response.data;

//     $detalleContenido.innerHTML = `
//       <div class="text-center">
//         <img src="${character.image}" alt="${character.name}" class="w-40 h-40 rounded-full mx-auto">
//         <h2 class="text-3xl font-bold mt-4">${character.name}</h2>
//         <p class="text-gray-600"><strong>Especie:</strong> ${character.species}</p>
//         <p class="text-gray-600"><strong>Origen:</strong> ${character.origin.name}</p>
//         <p class="text-gray-600"><strong>Ubicación:</strong> ${character.location.name}</p>
//       </div>
//     `;
    

//     // Mostrar el contenedor de detalles
//   $detallePersonaje.style.display = "block"

    
//   } catch (error) {
//     console.error("Error al obtener detalles del personaje:", error);
//   }
// }

// $cerrarDetalle.addEventListener("click", () => {
//   $detallePersonaje.style.display = "none";
//   $contenedorResultados.style.display = "block"; 
// });



async function mostrarDetalle(id) {
  $contenedorResultados.style.display = "none"; // Oculta los resultados
  $detallePersonaje.style.display = "block"; // Muestra los detalles

  try {
    const response = await axios.get(`${API_BASE_URL}/character/${id}`);
    const character = response.data;

    // Construir HTML inicial con la info del personaje
    $detalleContenido.innerHTML = `
      <div class="text-center">
        <img src="${character.image}" alt="${character.name}" class="w-40 h-40 rounded-full mx-auto">
        <h2 class="text-3xl font-bold mt-4">${character.name}</h2>
        <p class="text-gray-600"><strong>Especie:</strong> ${character.species}</p>
        <p class="text-gray-600"><strong>Origen:</strong> ${character.origin.name}</p>
        <p class="text-gray-600"><strong>Ubicación:</strong> ${character.location.name}</p>
        <h3 class="text-xl font-semibold mt-6">Episodios en los que aparece:</h3>
        <ul id="lista-episodios" class="mt-2 text-gray-700">Cargando episodios...</ul>
        <button id="cerrarDetalle" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">Volver</button>
      </div>
    `;

    // Obtener los episodios
    const arrayPromises = character.episode.map(url => axios.get(url));
    const responseEpisodes = await Promise.all(arrayPromises);
    const arrayDetailEpisode = responseEpisodes.map(ep => ep.data);

    // Insertar episodios en la lista
    const listaEpisodios = document.getElementById("lista-episodios");
    listaEpisodios.innerHTML = ""; // Limpiar mensaje de "Cargando episodios..."

    arrayDetailEpisode.forEach(ep => {
      const li = document.createElement("li");
      li.textContent = `${ep.episode} - ${ep.name} (Fecha: ${ep.air_date})`;
      listaEpisodios.appendChild(li);
    });

  } catch (error) {
    console.error("Error al obtener detalles del personaje:", error);
    document.getElementById("lista-episodios").innerHTML = "No se pudieron cargar los episodios.";
  }
}

// Evento para cerrar el detalle y volver a la lista
document.addEventListener("click", (event) => {
  if (event.target.id === "cerrarDetalle") {
    $detallePersonaje.style.display = "none";
    $contenedorResultados.style.display = "block";
  }
});



// Cargar datos al inicio
window.onload = () => {
  obtenerDatos(paginaActual);
};