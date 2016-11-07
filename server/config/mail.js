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
    ]
};

const subscribeMail = {
    subject : 'Inscription à la Nuit de l\'Info',
    text : [
        'Bonjour,\r\n\r\n',
        'Vous êtes maintenant inscrit sur le site de la Nuit de l\'Info de Bordeaux.\r\n',
        'Pour vous connecter, il suffit de rentrer votre adresse e-mail et votre mot de passe',
        ' renseigné lors de l\'inscription.',
        '\r\n\r\n',
        'Vous pouvez d\'ores et déjà vous connecter sur le site pour trouver ou ',
        'créer une équipe.\r\n\r\n',
        'Rendez-vous le 1er Décembre pour la plus belle des nuits ! :)\r\n\r\n',
        'Loco, le robot mailer de la Nuit de l\'Info'
    ]
};

const applicationNotificationToTeamMail = {
    subject : 'Nouveau candidat pour votre équipe',
    text : [
        'Bonjour,\r\n\r\n',
        'Une nouvelle candidature a été déposée auprès de votre équipe.\r\n',
        'Pour la consulter, rendez-vous sur le dashboard du site : <link>.\r\n\r\n',
        'Que la Nuit soit avec vous ! :)\r\n\r\n',
        'Loco, le robot mailer de la Nuit de l\'Info'
    ]
};

const applicationNotificationToUserMail = {
    subject : 'Nouvelle candidature d\'une équipe',
    text : [
        'Bonjour,\r\n\r\n',
        'Une nouvelle candidature a été déposée auprès de vous.\r\n',
        'Pour la consulter, rendez-vous sur le dashboard du site : <link>.\r\n\r\n',
        'Que la Nuit soit avec vous ! :)\r\n\r\n',
        'Loco, le robot mailer de la Nuit de l\'Info'
    ]
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

function sendSubscribeMail(params, callback){
    transport.sendMail({
        from: from,
        to: params.to,
        subject: subscribeMail.subject,
        text: subscribeMail.text
            .join('')
    }, (err) => {
        if (callback){
            callback(err);
        }
    });
}

function sendApplicationNotificationToTeamMail(params, callback){
    transport.sendMail({
        from: from,
        to: params.to,
        subject: applicationNotificationToTeamMail.subject,
        text: applicationNotificationToTeamMail.text
            .join('')
            .replace('<link>', params.url)
    }, (err) => {
        if (callback){
            callback(err);
        }
    });
}

function sendApplicationNotificationToUserMail(params, callback){
    transport.sendMail({
        from: from,
        to: params.to,
        subject: applicationNotificationToUserMail.subject,
        text: applicationNotificationToUserMail.text
            .join('')
            .replace('<link>', params.url)
    }, (err) => {
        if (callback){
            callback(err);
        }
    });
}

module.exports = {
    sendPasswordRecoveryMail: sendPasswordRecoveryMail,
    sendSubscribeMail: sendSubscribeMail,
    sendApplicationNotificationToTeamMail: sendApplicationNotificationToTeamMail,
    sendApplicationNotificationToUserMail: sendApplicationNotificationToUserMail
};