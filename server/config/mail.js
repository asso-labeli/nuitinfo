'use strict';

let nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD
    }
});

const from = 'Nuit de l\'Info <nuitinfo@labeli.org>';

const passwordRecoveryMail = {
    subject : 'Demande de nouveau mot de passe',
    text : [
        'Bonjour,\r\n\r\n',
        'Vous avez demandé une réinitialisation de votre mot de passe.\r\n',
        'Si c\'est le cas, cliquez sur le lien suivant : <link>',
        '\r\n\r\n',
        'Sinon, ignorez simplement ce mail.\r\n\r\n',
        'A bientôt pour la Nuit ! :)\r\n\r\n',
        'Loco, le robot mailer de la Nuit de l\'Info'
    ],
    linkElement : 2
};

function sendPasswordRecoveryMail(params, callback){
    transport.sendMail({
        from: from,
        to: params.to,
        subject: passwordRecoveryMail.subject,
        text: passwordRecoveryMail.text
            .join('')
            .replace('<link>', params.url)
    }, (err) => {
        if (callback){
            callback(err);
        }
    });
}

module.exports = {
    sendPasswordRecoveryMail: sendPasswordRecoveryMail
};