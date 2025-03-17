import express from 'express';
import { sendContactFormEmail } from '../controllers/emailController';
import { getInstagramData } from '../controllers/instagramController';

const router = express.Router();

// Instagram Access Token
router.get('/get-instagram-feed', getInstagramData);

// Contact Form Emailing
router.post('/send-email', sendContactFormEmail);

export default router;
