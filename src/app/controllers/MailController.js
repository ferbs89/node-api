const Queue = require('../libs/Queue');

module.exports = {
    async send(req, res) {
        await Queue.add();

        return res.json({
            message: 'E-mail enviado com sucesso!'
        });
    }
};