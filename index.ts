import express from 'express';
import cors from 'cors';
import routes from './src/routes/routes';
import dotenv from 'dotenv';
import i18n from './src/config/i18n';
import cookieParser from 'cookie-parser';
import { languageMiddleware } from './src/middleware/languageMiddleware';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
     origin: [`${process.env.LOCALHOST}`, `${process.env.FRONTEND_URL}`], // Frontend URL
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: [
          'Content-Type',
          'Authorization',
          'Access-Control-Allow-Origin',
     ],
     credentials: true, // allows cookies delivery
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(i18n.init);
app.use(languageMiddleware);
app.use('/api', routes);
app.use(express.static(path.join(__dirname, 'dist')));

// Iniciar el servidor
app.listen(port, () => {
     console.log(`Servidor escuchando en ${process.env.LOCALHOST}`);
});
