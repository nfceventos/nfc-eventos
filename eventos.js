// ============================================================
//  eventos.js  —  Configuración de todos los eventos NFC
//  Para añadir un evento nuevo: copia un bloque y cambia
//  los valores. Eso es todo.
// ============================================================

const EVENTOS = {

  'cliente-01': {
    nombre:         "Nombre del cliente 01",
    tipo:           "Primera Comunión",       // Tipo de evento
    fecha:          "DD de mes de 2026",
    color:          "#7A2E4B",                // Color principal
    colorFondo:     "#FDF5F8",                // Color de fondo
    emoji:          "🌸",
    mensajeSubida:  "Comparte tus fotos del día especial",
    mensajeGaleria: "Todos los momentos del evento",
    carpeta:        "eventos/cliente-01",     // Carpeta en Cloudinary
    preset:         "eventos-cliente-01"      // Preset en Cloudinary
  },

  'cliente-02': {
    nombre:         "Nombre del cliente 02",
    tipo:           "Boda",
    fecha:          "DD de mes de 2026",
    color:          "#1B4332",
    colorFondo:     "#F0F7F4",
    emoji:          "💍",
    mensajeSubida:  "Comparte tus fotos del día especial",
    mensajeGaleria: "Todos los momentos del evento",
    carpeta:        "eventos/cliente-02",
    preset:         "eventos-cliente-02"
  }

  // Para añadir más clientes, copia uno de los bloques de arriba

};

// Evento por defecto (el que carga si la URL no lleva ?evento=)
const EVENTO_DEFAULT = "cliente-01";
