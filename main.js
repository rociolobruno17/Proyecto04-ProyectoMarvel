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

    $contenedorResultados.innerHTML = ``

    const response = await axios.get(url);
    const resultados = response.data.results;
    pintarDatos(resultados);
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    $contenedorResultados.innerHTML = ``
    $contenedorResultados.innerHTML = `<p class="text-red-500">No se encontraron resultados.</p>`;
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
    console.error("Error al filtrar personajes:", error);
    $contenedorResultados.innerHTML = `<p class="text-red-500">No se encontraron resultados.</p>`;
  }
}

/////////////////////// Función para pintar los datos ///////////////////////
function pintarDatos(datos) {
  $contenedorResultados.innerHTML = "";
  
  for (const item of datos) {
    const imageUrl = item.image ? item.image : "https://via.placeholder.com/200";
    const name = item.name || "Desconocido";
    const subtitle = item.episode ? `Episodios: ${item.episode.length}` : `Estado: ${item.status}`;

    $contenedorResultados.innerHTML += `
      <div class="m-4 p-4 bg-white rounded-lg shadow-md">
        <img src="${imageUrl}" alt="${name}" class="w-full h-64 object-cover rounded-lg">
        <h3 class="mt-2 text-lg font-semibold">${name}</h3>
        <p class="text-gray-600">${subtitle}</p>
      </div>`;
  }
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
    console.error("Error al obtener datos:", error);
    $contenedorResultados.innerHTML = `<p class="text-red-500">No se encontraron resultados.</p>`;
  }
}

// Cargar datos al inicio
window.onload = () => {
  obtenerDatos(paginaActual);
};