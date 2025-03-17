import { sendContactFormEmail } from '../controllers/emailController';

export default (req, res) => {
     return sendContactFormEmail(req, res);
};
