// ////////////////////////////////////////////////// Función para obtener datos de personajes o episodios ///////////////////////
// async function obtenerDatos(page) {
//   let url =  `${API_BASE_URL}/${filtroActual}?page=${page}`;

//   try {
//     const response = await axios.get(url);
//     const datos = response.data.results;
//     pintarDatos(datos);
//   } catch (error) {
//     $contenedorResultados.innerHTML = ``,
//     $contenedorResultados.innerHTML = `
//       <div class="flex items-center justify-center gap-4 p-6">
//         <img src="./error.png" alt="Error" class="w-96 h-96 object-contain">
//         <div>
//           <h1 class="text-6xl font-black text-gray-800 xl:text-[40px]">OOPS...</h1>
//           <p class="text-3xl font-bold text-gray-800 xl:text-[20px]">Parece que falta algo :(</p>
//           <p class="text-xl font-light text-gray-800 xl:text-[20px]">Es posible que haya escrito mal la búsqueda o que la página se haya movido</p>
//           <div class="flex gap-4 mt-4 text-xs text-gray-800 w-96 justify-start">
//             <button id="volverInicio" class="px-6 py-2 border border-green-500 text-green-500 font-semibold rounded-lg shadow-sm hover:bg-green-500 hover:text-white focus:outline-none transition">Volver al inicio</button>
//             <button class="hover:underline eliminar-boton">Contactar con soporte</button>
//           </div>
//         </div>
//       </div>`;
    
//   }
// }



// export default{
//     obtenerDatos,
//   }