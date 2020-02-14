const Mail = require('../libs/Mail');

module.exports = {
    key: 'SendMail',
    async handle() {
        await Mail.sendMail({
            from: 'Queue Test <queue@node-api.com>',
            to: 'Fernando Sanches <ferbs89@gmail.com>',
            subject: 'Novo e-mail',
            html: 'Olá mundo!'
        });
    }
};