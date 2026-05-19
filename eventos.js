// ============================================================
//  eventos.js  —  Configuración de todos los eventos NFC
//  Para añadir un evento nuevo: copia el bloque de "gianna"
//  y cambia los valores. Eso es todo.
// ============================================================

const EVENTOS = {

  gianna: {
    nombre:          "Gianna",
    tipo:            "Primera Comunión",
    fecha:           "16 de mayo de 2026",
    color:           "#7A2E4B",       // Color principal (botones, header)
    colorFondo:      "#FDF5F8",       // Color de fondo de la página
    emoji:           "🌸",
    mensajeSubida:   "Comparte tus fotos del día especial de Gianna",
    mensajeGaleria:  "Todos los momentos del día de Gianna",
    carpeta:         "eventos/gianna", // Carpeta en Cloudinary
    preset:          "eventos-gianna"  // Upload Preset en Cloudinary
  }

  // ── Ejemplo de cómo añadir el próximo evento ──────────────
  // ,boda-juan-maria: {
  //   nombre:          "Juan & María",
  //   tipo:            "Boda",
  //   fecha:           "20 de junio de 2026",
  //   color:           "#1B4332",
  //   colorFondo:      "#F0F7F4",
  //   emoji:           "💍",
  //   mensajeSubida:   "Captura nuestro día especial",
  //   mensajeGaleria:  "Los momentos de la boda de Juan & María",
  //   carpeta:         "eventos/boda-juan-maria",
  //   preset:          "eventos-boda-juan-maria"
  // }

};

// Evento que se carga si la URL no lleva ?evento=
const EVENTO_DEFAULT = "gianna";
