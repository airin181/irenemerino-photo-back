// src/middlewares/languageMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const languageMiddleware = (
     req: Request,
     res: Response,
     next: NextFunction
) => {
     if (req.cookies.lang) {
          // 'lang' cookie
          req.setLocale(req.cookies.lang);
     } else if (req.headers['accept-language']) {
          // browser fav lang
          const preferredLang = req.headers['accept-language'].split(',')[0]; // Solo tomar el primer idioma
          req.setLocale(preferredLang);
     } else {
          // if any, default lang
          req.setLocale('es');
     }
     next();
};
