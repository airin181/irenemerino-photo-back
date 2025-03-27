import express from 'express';
import { sendContactFormEmail } from '../controllers/emailController';
import { getInstagramData } from '../controllers/instagramController';

const router = express.Router();

// test
router.get('/', (req, res) => {
     res.status(200).json({
          message: 'IT WORKS!',
     });
});

// Instagram Access Token
router.get('/get-instagram-feed', getInstagramData);

// Contact Form Emailing
router.post('/send-email', sendContactFormEmail);

export default router;
