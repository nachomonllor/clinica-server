import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';

// create reusable smtpTransport object using the default SMTP transport
let smtpTransport = nodemailer.createTransport({
  host: 'mail.devkingos.com',
  port: 465,
  secure: true,
    auth: {
        user: 'clinicamonllor@devkingos.com', // generated ethereal user
        pass: 'YXG4ewzJCG}W' // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
});

var handlebarsOptions = {
    viewEngine: {
        extName: '.html',
        partialsDir: './server/templates/',
        layoutsDir: './server/templates/',
        defaultLayout: 'verify-email.html',
    },
    viewPath: path.resolve('./server/templates/'),
    extName: '.html'
  };

smtpTransport.use('compile', hbs(handlebarsOptions));

module.exports = smtpTransport;
