const https = require('https');

exports.handler = async function(event) {
  const evento = event.queryStringParameters && event.queryStringParameters.evento;

  const EVENTOS_VALIDOS = {
    'cliente-01': 'eventos/cliente-01',
    'cliente-02': 'eventos/cliente-02',
  };

  if (!evento) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Falta ?evento=' }) };
  }

  const carpeta = EVENTOS_VALIDOS[evento];
  if (!carpeta) {
    return { statusCode: 404, body: JSON.stringify({ error: 'Evento no válido' }) };
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey    = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?type=upload&prefix=${encodeURIComponent(carpeta)}&max_results=500`;

  const response = await fetch(url, {
    headers: { 'Authorization': `Basic ${credentials}` }
  });

  const data = await response.json();

  const photos = (data.resources || [])
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map(r => ({ url: r.secure_url, public_id: r.public_id }));

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ photos, total: photos.length, cloudName, carpeta, rawData: data })
  };
};
