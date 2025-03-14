import express from 'express';
import cors from 'cors';

import routes from './routes/routes'; // Usar import
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
     origin: 'http://localhost:5173', // Frontend URL
     methods: ['GET', 'POST'], // Métodos permitidos
     allowedHeaders: ['Content-Type'], // Encabezados permitidos
};
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', routes);

// Ruta para obtener el Access Token de Instagram

// Iniciar el servidor
app.listen(port, () => {
     console.log(`Servidor escuchando en http://localhost:${port}`);
});
