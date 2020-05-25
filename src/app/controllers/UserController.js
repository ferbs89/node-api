const { User } = require('../models');

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
        const { name, email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });

        if (user)
            return res.status(400).json({ error: "O e-mail informado já possui cadastro." });

        await User.create({
            name,
            email,
            password,
        
        }).then(user => {
            return res.json({ id: user.id });
        
        }).catch(err => {
            if (!err.errors)
                return res.status(400).json({ error: "Não foi possível salvar o usuário." });

            const error = [];
            err.errors.map(e => error.push(e.message));

            return res.status(400).json({ error });
        });
    },

    async show(req, res) {
        const { id } = req.params;

        const user = await User.findByPk(id, { 
            attributes: {
                exclude: ['password']
            }
        });

        if (!user)
            return res.status(400).json({ error: "Usuário não encontrado." });

        return res.json(user);
    },

    async update(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const user = await User.findByPk(id);

        if (!user)
            return res.status(400).json({ error: "Usuário não encontrado." });

        await user.update({
            name,
            email,
            password,
        
        }).then(user => {
            return res.send();

        }).catch(err => {
            return res.status(400).json({ error: "Não foi possível atualizar o usuário." });
        });
    },

    async destroy(req, res) {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user)
            return res.status(400).json({ error: "Usuário não encontrado." });

        user.destroy();

        return res.send();
    }
};