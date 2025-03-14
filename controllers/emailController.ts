import transporter from '../config/nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export function sendContactFormEmail(req: any, res: any) {
     const { name, email, via, otherVia, message, accept } = req.body;

     const mailOptions = {
          from: email,
          to: process.env.MY_EMAIL,
          subject: 'new email from contact form',
          text: `mensaje de ${name}: ${message}`,
          // via,
          // message,
          // accept,
          // otherVia,
     };

     transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
               return res
                    .status(500)
                    .send('Error al enviar el correo: ' + error);
          }
          res.status(200).send('Correo enviado: ' + info.response);
     });
}
