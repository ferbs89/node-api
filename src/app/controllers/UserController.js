const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
    async index(req, res) {
        const users = await User.findAll({
            attributes: { exclude: ["password"] }
        });

        return res.json(users);
    },

    async store(req, res) {
        await User.create(
            req.body
        )
        .then(user => {
            user.password = undefined;

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

        if (!user)
            return res.status(401).json({ error: "E-mail não encontrado." });

        if (user.password != password)
            return res.status(401).json({ error: "Senha incorreta." });

        user.password = undefined;

        const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);

        return res.json({ 
            user,
            token
        });
    }
};
