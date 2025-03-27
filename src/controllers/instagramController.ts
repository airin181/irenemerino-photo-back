import axios from 'axios';
import { Request, Response } from 'express';

export async function getInstagramData(req: Request, res: Response) {
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
          res.json(response.data);
     } catch (error) {
          console.error('Error al obtener el feed de Instagram:', error);
          res.status(500).send('Error al obtener el feed de Instagram');
     }
}
