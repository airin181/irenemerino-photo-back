import express from 'express';
import { sendContactFormEmail } from '../controllers/emailController';
import { getInstagramData } from '../controllers/instagramController';
import { Request, Response } from 'express';

const router = express.Router();

// Instagram Access Token
router.get('/get-instagram-feed', getInstagramData);

// Contact Form Emailing
router.post('/send-email', sendContactFormEmail);

router.post('/', (req: any, res: any) => {
     return res.json({ message: 'Helloooooooo!' });
});

export default router;
