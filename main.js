const $ = (element) => document.querySelector(element);
const $$ = (element) => document.querySelectorAll(element);

const API_BASE_URL = "https://rickandmortyapi.com/api";

const $imagenPrincipal = $("#imagen-principal");
const $sectionBuscar = $("#section-buscar");
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
const $detalleContenido= $("#detalle-contenido");

const $detalleEpisodio= $("#detalle-episodio"); 
const $detalleContenidoEpisodio= $("#detalle-contenido-episodio");




let paginaActual = 1;
let filtroActual = "character"; // Por defecto, busca personajes


////////////////////////////////////////////// Carga inicial con personajes aleatorios ///////////////////////

async function mostrarPersonajesAleatorios() {
  $contenedorResultados.innerHTML = `<div class="loader"></div>`;

  try {
    const response = await axios.get(`${API_BASE_URL}/character`);
    const personajes = response.data.results;
    $contenedorResultados.innerHTML = "";
    pintarDatos(personajes);
  } catch (error) {
    $contenedorResultados.innerHTML = ``,
    $contenedorResultados.innerHTML = `
      <div class="flex items-center justify-center gap-4 p-6">
        <img src="./error.png" alt="Error" class="w-96 h-96 object-contain">
        <div>
          <h1 class="text-6xl font-black text-gray-800 xl:text-[40px]">OOPS...</h1>
          <p class="text-3xl font-bold text-gray-800 xl:text-[20px]">Parece que falta algo :(</p>
          <p class="text-xl font-light text-gray-800 xl:text-[20px]">Es posible que haya escrito mal la búsqueda o que la página se haya movido</p>
          <div class="flex gap-4 mt-4 text-xs text-gray-800 w-96 justify-start">
            <button id="volverInicio" class="px-6 py-2 border border-green-500 text-green-500 font-semibold rounded-lg shadow-sm hover:bg-green-500 hover:text-white focus:outline-none transition">Volver al inicio</button>
            <button class="hover:underline eliminar-boton">Contactar con soporte</button>
          </div>
        </div>
      </div>`;
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  await mostrarPersonajesAleatorios();
});

    // Evento para volver al inicio
document.addEventListener("click", (event) => {
  if (event.target.id === "volverInicio") {
    console.log("Volviendo al inicio...");
    $detallePersonaje.style.display = "none";
    $detalleEpisodio.style.display = "none";
    $contenedorResultados.style.display = "flex";
    $sectionBuscar.style.display = "block";
    $contenedorPaginacion.style.display = "flex";

    mostrarPersonajesAleatorios();
    
  }
});


//////////////////////////////////////////////  Eventos de paginación /////////////////////// 

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

////////////////////////////////////////////////// Función para obtener datos de personajes o episodios ///////////////////////
async function obtenerDatos(page) {
  let url =  `${API_BASE_URL}/${filtroActual}?page=${page}`;

  try {
    const response = await axios.get(url);
    const datos = response.data.results;
    pintarDatos(datos);
  } catch (error) {
    $contenedorResultados.innerHTML = ``,
    $contenedorResultados.innerHTML = `
      <div class="flex items-center justify-center gap-4 p-6">
        <img src="./error.png" alt="Error" class="w-96 h-96 object-contain">
        <div>
          <h1 class="text-6xl font-black text-gray-800 xl:text-[40px]">OOPS...</h1>
          <p class="text-3xl font-bold text-gray-800 xl:text-[20px]">Parece que falta algo :(</p>
          <p class="text-xl font-light text-gray-800 xl:text-[20px]">Es posible que haya escrito mal la búsqueda o que la página se haya movido</p>
          <div class="flex gap-4 mt-4 text-xs text-gray-800 w-96 justify-start">
            <button id="volverInicio" class="px-6 py-2 border border-green-500 text-green-500 font-semibold rounded-lg shadow-sm hover:bg-green-500 hover:text-white focus:outline-none transition">Volver al inicio</button>
            <button class="hover:underline eliminar-boton">Contactar con soporte</button>
          </div>
        </div>
      </div>`;
    
  }
}

////////////////////////////////////////////// Buscar personajes o episodios ///////////////////////
$botonBuscar.addEventListener("click", async () => {
  
  $contenedorResultados.innerHTML = `<div class="loader"></div>`

  const textoBuscar = $inputTextoBuscar.value.trim();
  const tipoBusqueda = $selectFiltroTipo.value;
  let url = "";

  if (tipoBusqueda === "personajes") {
    url = `${API_BASE_URL}/character/?name=${textoBuscar}`;
  } else {
    url = `${API_BASE_URL}/episode/?name=${textoBuscar}`;
  }


  try {
    const response = await axios.get(url);
    const resultados = response.data.results;

    $contenedorResultados.innerHTML = ``

    pintarDatos(resultados);
  } catch (error) {
    $contenedorResultados.innerHTML = ``,

    $sectionBuscar.style.display = "block"; // Muestra el buscador
    $contenedorPaginacion.style.display = "none"; // Muestra la paginación
    $contenedorResultados.innerHTML = `
      <div class="flex items-center justify-center gap-4 p-6">
        <img src="./error2.gif" alt="Error" class="w-96 h-96 object-contain">
        <div>
          <h1 class="text-6xl font-black text-gray-800 xl:text-[40px]">OOPS...</h1>
          <p class="text-3xl font-bold text-gray-800 xl:text-[20px]">Parece que falta algo :(</p>
          <p class="text-xl font-light text-gray-800 xl:text-[20px]">Es posible que haya escrito mal la búsqueda o que la página se haya movido</p>
          <div class="flex gap-4 mt-4 text-xs text-gray-800 w-96 justify-start">
            <button id="volverInicio" class="px-6 py-2 border border-green-500 text-green-500 font-semibold rounded-lg shadow-sm hover:bg-green-500 hover:text-white focus:outline-none transition">Volver al inicio</button>
            <button class="hover:underline eliminar-boton">Contactar con soporte</button>
          </div>
        </div>
      </div>`;
  }
});

////////////////////////////////////////////// Filtrar personajes por status y gender ///////////////////////

$selectFiltroStatus.addEventListener("change", aplicarFiltros);
$selectFiltroGender.addEventListener("change", aplicarFiltros);

async function aplicarFiltros() {
  const status = $selectFiltroStatus.value;
  const gender = $selectFiltroGender.value;
  let url = `${API_BASE_URL}/character/?`;

  if (status !== "all") url += `status=${status}&`;
  if (gender !== "all") url += `gender=${gender}`;

  try {
    const { data } = await axios.get(url);
    const personajes = data.results;

    pintarDatos(personajes);
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    $contenedorResultados.innerHTML = ``,
    $contenedorResultados.innerHTML = `
      <div class="flex items-center justify-center gap-4 p-6">
        <img src="./error.png" alt="Error" class="w-96 h-96 object-contain">
        <div>
          <h1 class="text-6xl font-black text-gray-800 xl:text-[40px]">OOPS...</h1>
          <p class="text-3xl font-bold text-gray-800 xl:text-[20px]">Parece que falta algo :(</p>
          <p class="text-xl font-light text-gray-800 xl:text-[20px]">Es posible que haya escrito mal la búsqueda o que la página se haya movido</p>
          <div class="flex gap-4 mt-4 text-xs text-gray-800 w-96 justify-start">
            <button id="volverInicio" class="px-6 py-2 border border-green-500 text-green-500 font-semibold rounded-lg shadow-sm hover:bg-green-500 hover:text-white focus:outline-none transition">Volver al inicio</button>
            <button class="hover:underline eliminar-boton">Contactar con soporte</button>
          </div>
        </div>
      </div>`;
  }
}


////////////////////////////////////////////// Función para pintar los datos diferenciando entre episodio y personaje ///////////////////////
function pintarDatos(datos) {
  $contenedorResultados.innerHTML = "";

  for (const item of datos) {
    const isCharacter = item.hasOwnProperty("image");

    if (isCharacter) {
      const imageUrl = item.image ? item.image : "https://via.placeholder.com/200";
      const name = item.name || "Desconocido";

      $contenedorResultados.innerHTML += `
      <div class="relative m-4 pb-4  bg-white rounded-lg shadow-lg cursor-pointer character-card transform transition-transform duration-300 hover:scale-110" data-id="${item.id}">
        <img src="${imageUrl}" alt="${name}" class="w-full h-96 object-cover rounded-lg">
        <h3 class="mt-4 pl-4 text-3xl font-bold text-gray-800">${name}</h3>
      </div>
    `;

    } else {
      // Si es un episodio
      const name = item.name || "Desconocido";
      const episodeCode = item.episode || "Código no disponible";
      const airDate = item.air_date || "Fecha no disponible";

      $contenedorResultados.innerHTML += `
      <div class="m-4 p-4 bg-white rounded-lg shadow-md cursor-pointer episode-card transform transition duration-300 hover:scale-105" data-id="${item.id}">
        <h3 class="text-4xl font-bold text-gray-800">${name}</h3>
        <p class="text-gray-600">Episodio: ${episodeCode}</p>
        <p class="text-gray-600">Fecha de emisión: ${airDate}</p>
      </div>`;
    }
  }

 /////////////////////// ///////////////////////// Agregar evento de clic a los personajes ///////////////////////
  document.querySelectorAll(".character-card").forEach(card => {
    card.addEventListener("click", async (event) => {
      const characterId = event.currentTarget.dataset.id;
      mostrarDetalle(characterId);
    });
  });

  //////////////////////////////////////////////// Agregar evento de clic a los episodios ///////////////////////
  document.querySelectorAll(".episode-card").forEach(card => {
    card.addEventListener("click", async (event) => {
      const episodeId = event.currentTarget.dataset.id;
      mostrarDetalleEpisodio(episodeId);
    });
  });

}

////////////////////////////////////////////////// Ocultar filtros cuando se selecciona episodios /////////////////////////
$selectFiltroTipo.addEventListener("change", () => {
  filtroActual = $selectFiltroTipo.value === "episodios" ? "episode" : "character";
  paginaActual = 1; // Reiniciar a la primera página cuando se cambia el tipo

  if (filtroActual === "episode") {
    $selectFiltroStatus.style.display = "none";
    $selectFiltroGender.style.display = "none";
  } else {
    $selectFiltroStatus.style.display = "block";
    $selectFiltroGender.style.display = "block";
  }

  obtenerDatos(paginaActual);

});

////////////////////////////////////////////////// Mostrar detalle de personajes /////////////////////////

async function mostrarDetalle(id) {
  $contenedorResultados.style.display = "none"; // Oculta los resultados
  $contenedorPaginacion.style.display = "none"; // Oculta la paginacion
  $sectionBuscar.style.display = "none"; // Oculta la barra de busqueda y filtros
  // $imagenPrincipal.style.display = "none"; // Oculta la imagen
  $detallePersonaje.style.display = "block"; // Muestra los detalles del personaje

  try {
    const response = await axios.get(`${API_BASE_URL}/character/${id}`);
    const character = response.data;

    // Construir HTML inicial con la info del personaje
    $detalleContenido.innerHTML = `
      <div class="text-center ">
      <button id="cerrarDetalle" class="flex flex-col item-start m-2 p-2 text-2xl font-black bg-green-500 text-white rounded"> ← </button>
        <img src="${character.image}" alt="${character.name}" class="w-40 h-40 rounded-full mx-auto">
        <h2 class="text-3xl font-bold mt-4">${character.name}</h2>
        <p class="text-gray-600"><strong>Especie:</strong> ${character.species}</p>
        <p class="text-gray-600"><strong>Origen:</strong> ${character.origin.name}</p>
        <p class="text-gray-600"><strong>Ubicación:</strong> ${character.location.name}</p>
        <h3 class="text-xl font-semibold mt-6">Episodios en los que aparece:</h3>
        <ul id="lista-episodios" class="mt-2 text-gray-700">Cargando episodios...</ul>
      </div>
    `;

    // Obtener los episodios 
    const arrayPromises = character.episode.map(url => axios.get(url));
    const responseEpisodes = await Promise.all(arrayPromises);
    const arrayDetailEpisode = responseEpisodes.map(ep => ep.data);

    // Insertar episodios en la lista 
    const listaEpisodios = document.getElementById("lista-episodios");
    listaEpisodios.innerHTML = ""; // Limpiar mensaje de "Cargando episodios..."

    arrayDetailEpisode.forEach(episode => {
      const card = document.createElement("div");
      card.className = "cursor-pointer m-8 p-4 bg-white rounded-lg shadow-md transform transition duration-300 hover:scale-105";
      card.innerHTML = `
        <h4 class="text-lg font-semibold text-gray-800">${episode.name}</h4>
        <p class="text-gray-600">Episodio: ${episode.episode}</p>
        <p class="text-gray-600">Fecha de emisión: ${episode.air_date}</p>
      `;
    
      // Agregar listener para redirigir al detalle del episodio
      card.addEventListener("click", () => {
        mostrarDetalleEpisodio(episode.id); // Usamos el ID del episodio
            
    // Mostrar la sección de detalles de epidosio
    $detalleEpisodio.style.display = "block";
    // Ocultar la sección de detalles de personaje
    $detallePersonaje.style.display = "none";
      });
      
    
      listaEpisodios.appendChild(card);
    });


    // Agregar evento al botón "Volver"
    document.getElementById("cerrarDetalle").addEventListener("click", () => {
      $detallePersonaje.style.display = "none"; // Oculta detalles
      $sectionBuscar.style.display = "block"; // Muestra el buscador
      $contenedorResultados.style.display = "flex"; // Muestra los resultados
      $contenedorPaginacion.style.display = "block"; // Muestra la paginación

    });

  } catch (error) {
    console.error("Error al obtener detalles del personaje:", error);
    document.getElementById("lista-episodios").innerHTML = "No se pudieron cargar los episodios.";
  }
}


////////////////////////////////////////////////// Mostrar detalle de episodios /////////////////////////

async function mostrarDetalleEpisodio(episodeId) {
  $contenedorResultados.style.display = "none"; // Oculta los resultados
  $contenedorPaginacion.style.display = "none";
  $sectionBuscar.style.display = "none";
  $detalleEpisodio.style.display = "block"; // Muestra los detalles

  try {
    // Obtener los detalles del episodio
    const response = await axios.get(`${API_BASE_URL}/episode/${episodeId}`);
    const episode = response.data;

    // Obtener los personajes del episodio
    const characters = await Promise.all(
      episode.characters.map(url => axios.get(url).then(res => res.data))
    );

    // Construir HTML con detalles del episodio y personajes
    $detalleContenidoEpisodio.innerHTML = ` 
      <div class="flex flex-col items-center justify-center gap-4 mt-4">
              <button id="cerrarDetalleEpisodio" class="flex item-start m-2 p-2 text-2xl font-black bg-green-500 text-white rounded"> ← </button>

      <h2 class="text-3xl font-bold text-gray-800">${episode.name}</h2>
      <p class="text-gray-600">Episodio: ${episode.episode}</p>
      <p class="text-gray-600">Fecha de emisión: ${episode.air_date}</p>
      <h3 class="mt-4 text-2xl font-bold text-gray-800">Personajes:</h3>
        </div>
      <div class="flex flex-wrap items-center justify-center gap-4 mt-4">
        ${characters.map(character => `
            <div class="personaje-episodio cursor-pointer p-2 bg-gray-200 rounded-lg flex items-center" data-id="${character.id}">
            <img src="${character.image}" alt="${character.name}" class="w-12 h-12 rounded-full">
            <p class="ml-2 text-gray-800">${character.name}</p>
            </div>`)
          .join("")}
      </div>`;
      
// Agregar evento a cada personaje para mostrar su detalle
document.querySelectorAll(".personaje-episodio").forEach(personajeCard => {
  personajeCard.addEventListener("click", () => {
    const characterId = personajeCard.getAttribute("data-id");
    $detalleEpisodio.style.display = "none";
    mostrarDetalle(characterId); // Llama a la función de detalle del personaje
  });
});
    // Mostrar la sección de detalles
    $detalleEpisodio.style.display = "block";

   // Evento para cerrar el detalle y volver a la lista
    document.addEventListener("click", (event) => {
      if (event.target.id === "cerrarDetalleEpisodio") {
         $detalleEpisodio.style.display = "none";
         $sectionBuscar.style.display = "block";
         $contenedorResultados.style.display = "flex";
         $contenedorPaginacion.style.display = "block";
     }
});
  } catch (error) {
    console.error("Error al obtener detalles del episodio:", error);
    $detalleContenidoEpisodio.innerHTML = `
    <div class="flex items-center justify-center gap-4 p-6">
      <img src="./error.png" alt="Error" class="w-96 h-96 object-contain">
      <div>
        <h1 class="text-6xl font-black text-gray-800 xl:text-[40px]">OOPS...</h1>
        <p class="text-3xl font-bold text-gray-800 xl:text-[20px]">Parece que falta algo :(</p>
        <p class="text-xl font-light text-gray-800 xl:text-[20px]">Es posible que haya escrito mal la búsqueda o que la página se haya movido</p>
        <div class="flex gap-4 mt-4 text-xs text-gray-800 w-96 justify-start">
          <button id="volverInicio" class="px-6 py-2 border border-green-500 text-green-500 font-semibold rounded-lg shadow-sm hover:bg-green-500 hover:text-white focus:outline-none transition">Volver al inicio</button>
          <button class="hover:underline eliminar-boton">Contactar con soporte</button>
        </div>
      </div>
    </div>`;
  }
}




// // Cargar datos al inicio
// window.onload = () => {
//   obtenerDatos(paginaActual);

  
// };

window.onload = async () => {
  
  await obtenerDatos(paginaActual);


};
