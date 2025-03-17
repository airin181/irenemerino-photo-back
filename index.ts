import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
import dotenv from 'dotenv';
import i18n from './config/i18n';
import cookieParser from 'cookie-parser';
import { languageMiddleware } from './middleware/languageMiddleware';

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
     origin: [
          'http://localhost:5173',
          'https://airin181.github.io/irenemerino-photo/',
     ], // Frontend URL
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization'],
     credentials: true, // allows cookies delivery
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(i18n.init);
app.use(languageMiddleware);
app.use('/api', routes);

// Iniciar el servidor
app.listen(port, () => {
     console.log(`Servidor escuchando en ${process.env.HOST}${port}`);
});
