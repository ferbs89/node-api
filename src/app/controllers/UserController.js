const { User } = require("../models");

module.exports = {
    async index(req, res) {
        const users = await User.findAll();
        return res.json(users);
    },

    async store(req, res) {
        await User.create(
            req.body
        )
        .then(user => {
            return res.json(user);
        })
        .catch(err => {
            const error = [];

            err.errors.map(e => {
                error.push(e.message);
            });

            return res.status(400).json({ error });
        });
    },

    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: "Usuário não encontrado." });
        }

        if (user.password != password) {
            return res.status(401).json({ error: "Senha incorreta." });
        }

        return res.json(user);
    }
};
