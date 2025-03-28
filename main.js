const $ = (element) => document.querySelector(element);
const $$ = (element) => document.querySelectorAll(element);

const API_BASE_URL = "https://rickandmortyapi.com/api";

const $inputTextoBuscar = $("#texto-buscar");
const $botonBuscar = $("#boton-buscar");
const $contenedorResultados = $("#contenedor-comics");
const $selectFiltroTipo = $("#select-filtro-tipo");
const $selectFiltroStatus = $("#select-filtro-status");
const $selectFiltroGender = $("#select-filtro-gender");
const $botonAnterior = $("#pagina-anterior");
const $botonSiguiente = $("#pagina-siguiente");



/////////////////////// Carga inicial con personajes aleatorios ///////////////////////
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/character`);
    const personajes = response.data.results;
    pintarDatos(personajes);
  } catch (error) {
    console.error("Error al cargar personajes aleatorios:", error);
  }
});

/////////////////////// Buscar personajes o episodios ///////////////////////
$botonBuscar.addEventListener("click", async () => {
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
    pintarDatos(resultados);
  } catch (error) {
    console.error("Error en la búsqueda:", error);
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




let currentPage = 1;

$botonSiguiente.addEventListener("click", () => {
  currentPage += 1;
  obtenerDatos(currentPage);
});

$botonAnterior.addEventListener("click", () => {
    currentPage -= 1;
    obtenerDatos(currentPage);
});

async function obtenerDatos(page) {
  try {
    const response = await axios.get(`${API_BASE_URL}/character?page=${page}`);
    const characters = response.data.results; // Extraemos los personajes de la respuesta
    pintarDatos(characters); // Mostramos los personajes en la UI
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    $containerCards.innerHTML = `<p class="text-red-500">No se pudieron cargar los personajes.</p>`;
  }
}

// Ejecutar la primera carga de datos al abrir la página
window.onload = () => {
  obtenerDatos(currentPage);
};