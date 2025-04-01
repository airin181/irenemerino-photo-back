import config from 'config';
import express from 'express';
import cors from 'cors';
import routes from './src/routes/routes';
import dotenv from 'dotenv';
import i18n from './src/config/i18n';
import cookieParser from 'cookie-parser';
import { languageMiddleware } from './src/middleware/languageMiddleware';
import path from 'path';
import helmet from 'helmet';

dotenv.config();

const app = express();
const port = process.env.PORT;

const trustProxy = config.get<number>('server.trustProxy') || 1;
app.set('trust proxy', trustProxy);

const corsDomains = config.get<string | string[]>('server.cors');
// const corsOptions = {
//      origin: function (
//           origin: any,
//           callback: (err: Error | null, allow?: boolean) => void
//      ) {
//           const allowedOrigins = [
//                process.env.FRONTENDLOCALHOST,
//                process.env.FRONTEND_URL,
//           ];
//           if (
//                !origin ||
//                allowedOrigins.includes(origin) ||
//                origin.startsWith(process.env.FRONTEND_URL)
//           ) {
//                callback(null, true);
//           } else {
//                callback(new Error('Not allowed by CORS'));
//           }
//      },
//      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//      allowedHeaders: [
//           'Content-Type',
//           'Authorization',
//           'Access-Control-Allow-Origin',
//      ],
//      credentials: true, // allows cookies delivery
// };
if (corsDomains)
     app.use(
          cors({
               origin: corsDomains,
               methods: ['GET', 'POST', 'PUT', 'DELETE'],
               credentials: true,
               // maxAge: 7200
          })
     );

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(i18n.init);
app.use(languageMiddleware);
app.use('/api', routes);
app.use(express.static(path.join(__dirname, 'dist')));

// Iniciar el servidor
app.listen(port, () => {
     console.log(`Servidor escuchando en ${process.env.BACKENDLOCALHOST}`);
});
