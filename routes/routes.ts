import express from 'express';
import { sendContactFormEmail } from '../controllers/emailController';
import { getInstagramData } from '../controllers/instagramController';

const router = express.Router();

// Instagram Access Token
router.get('/get-instagram-feed', getInstagramData);

// Contact Form Emailing
router.post('/send-email', sendContactFormEmail);

router.get('/hello', (req, res) => {
     res.send('Hello, this is the backend response!');
});

export default router;
