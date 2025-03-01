const express = require('express');
const cors = require('cors'); // Para permitir solicitudes del frontend
const axios = require('axios'); // Si necesitas hacer solicitudes HTTP a la API de Instagram
require('dotenv').config();

const app = express();
const port = 3000;

app.use(
  cors({
    origin: 'http://localhost:5173', // Asegúrate de que la URL del frontend es la correcta
  })
);

// Ruta para obtener el Access Token de Instagram
app.get('/get-instagram-feed', async (req, res) => {
  try {
    // Realiza la solicitud a Instagram Graph API
    const response = await axios.get(
      `https://graph.facebook.com/v22.0/${process.env.INSTAGRAM_BUSINNESS_ACCOUNT_ID}/media?`,
      {
        params: {
          fields: 'media_count,media_type,permalink,media_url,user_media',
          limit: 9,
          access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
        },
      }
    );
    console.log(response);

    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener el feed de Instagram:', error);
    res.status(500).send('Error al obtener el feed de Instagram');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
