// api/photos.js  —  Función serverless (Vercel)
// Recibe: GET /api/photos?evento=gianna
// Devuelve: JSON con array de fotos del evento

// Lista de eventos válidos (seguridad: evita consultas a carpetas aleatorias)
// ⚠️  Añade aquí cada evento nuevo que crees
const EVENTOS_VALIDOS = {
  'cliente-01': 'eventos/cliente-01',
  'cliente-02': 'eventos/cliente-02',
  // 'boda-juan-maria': 'eventos/boda-juan-maria',
  // Añade más eventos aquí...
};

export default async function handler(req, res) {
  // Solo GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { evento } = req.query;

  // Validar que se pasó el parámetro
  if (!evento) {
    return res.status(400).json({ error: 'Falta el parámetro ?evento=' });
  }

  // Validar que el evento existe en nuestra lista
  const carpeta = EVENTOS_VALIDOS[evento];
  if (!carpeta) {
    return res.status(404).json({ error: 'Evento no encontrado: ' + evento });
  }

  // Credenciales de Cloudinary (vienen de las variables de entorno de Vercel)
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey    = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('Faltan variables de entorno de Cloudinary');
    return res.status(500).json({ error: 'Configuración del servidor incompleta' });
  }

  try {
    // Llamar a la API Admin de Cloudinary
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image` +
      `?type=upload&prefix=${encodeURIComponent(carpeta)}&max_results=500`;

    const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Error Cloudinary:', errText);
      return res.status(500).json({ error: 'Error al obtener fotos de Cloudinary' });
    }

    const data = await response.json();

    // Formatear la respuesta: solo enviamos lo que necesita el frontend
    const photos = (data.resources || [])
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // más recientes primero
      .map(r => ({
        url:        r.secure_url,
        public_id:  r.public_id,
        width:      r.width,
        height:     r.height,
        created_at: r.created_at
      }));

    // Cache: 30 segundos (la galería se actualiza "casi en tiempo real")
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
    return res.status(200).json({ photos, total: photos.length });

  } catch (err) {
    console.error('Error en api/photos:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
