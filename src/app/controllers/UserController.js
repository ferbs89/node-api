const { User } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
    async index(req, res) {
        const users = await User.findAll({
            attributes: { 
                exclude: ["password"] 
            },
            order: [
                ["name", "ASC"],
            ]
        });

        return res.json({ users });
    },

    async store(req, res) {
        const user = await User.findOne({ 
            where: { 
                email: req.body.email 
            } 
        });

        if (user)
            return res.status(400).json({ error: "O e-mail informado já possui cadastro." });

        await User.create(
            req.body
        )
        .then(user => {
            user.password = undefined;

            return res.json({ user });
        })
        .catch(err => {
            if (!err.errors)
                return res.status(400).json({ error: "Não foi possível salvar o usuário." });

            const error = [];

            err.errors.map(e => error.push(e.message));

            return res.status(400).json({ error });
        });
    },

    async show(req, res) {
        const user = await User.findByPk(req.params.id);

        if (!user)
            return res.status(400).json({ error: "Usuário não encontrado." });

        return res.json({ user });
    },

    async update(req, res) {
        const user = await User.findByPk(req.params.id);

        if (!user)
            return res.status(400).json({ error: "Usuário não encontrado." });

        await user.update(req.body);

        return res.json({ user });
    },

    async destroy(req, res) {
        const user = await User.findByPk(req.params.id);

        if (!user)
            return res.status(400).json({ error: "Usuário não encontrado." });

        user.destroy();

        return res.send();
    },

    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ 
            where: { 
                email 
            } 
        });

        if (!user)
            return res.status(400).json({ error: "E-mail não encontrado." });

        if (user.password != password)
            return res.status(400).json({ error: "Senha incorreta." });

        user.password = undefined;

        const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);

        return res.json({ 
            user,
            token
        });
    }
};
