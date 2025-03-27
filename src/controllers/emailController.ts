import transporter from '../config/nodemailer';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export function sendContactFormEmail(req: Request, res: Response) {
     const { name, email, via, otherVia, message, termsAccepted } = req.body;

     if (!termsAccepted) {
          res.status(400).json({
               error: req.__('error-terms'),
          });
     } else if (!validateEmail(email)) {
          res.status(400).json({
               error: req.__('error-email'),
          });
     } else {
          const htmlContent = renderEmailTemplate(
               'dist/static/contact-email-template.html',
               req.body
          );
          const mailOptions = {
               from: email,
               to: process.env.MY_EMAIL,
               subject: `New contact message from ${name}`,
               html: htmlContent,
               // attachments: [
               //      {
               //           filename: 'contact-form-photo.jpg',
               //           path: path.join(
               //                __dirname,
               //                '..',
               //                'public',
               //                'images',
               //                'contact-form-photo.jpg'
               //           ),

               //           cid: 'contactFormPhoto',
               //      },
               // ],
          };

          transporter.sendMail(mailOptions, (error, info) => {
               if (error) {
                    return res.status(500).json({
                         error: req.__('error-transporter') + error,
                    });
               } else {
                    res.status(200).json({
                         message: req.__('email-sent'),
                    });
               }
          });
     }
}

function validateEmail(email: string) {
     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     return emailPattern.test(email);
}

const renderEmailTemplate = (templatePath: string, data: any) => {
     let template = fs.readFileSync(templatePath, 'utf-8');

     // Replace vars in the template
     // g flag means global: it will replace all the object instances in the html content
     Object.keys(data).forEach((key) => {
          const regex = new RegExp(`{{${key}}}`, 'g');
          template = template.replace(regex, data[key]);
     });

     return template;
};
