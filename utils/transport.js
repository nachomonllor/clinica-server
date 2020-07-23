import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';
const node_env = process.env.NODE_ENV || 'development'
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

const tmpl = node_env === 'development' ? './server/templates/' :  './templates/'
var handlebarsOptions = {
    viewEngine: {
        extName: '.html',
        partialsDir: tmpl,
        layoutsDir: tmpl,
        defaultLayout: 'verify-email.html',
    },
    viewPath: path.resolve(tmpl),
    extName: '.html'
  };

smtpTransport.use('compile', hbs(handlebarsOptions));

module.exports = smtpTransport;
