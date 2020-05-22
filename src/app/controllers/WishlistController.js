const { User, Wishlist } = require('../models');

module.exports = {
    async index(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            include: { association: 'wishlists' }
        });

        if (!user)
            return res.status(400).json({ error: "Usuário não encontrado." });

        return res.json(user.wishlists);
    },

    async store(req, res) {
        const { user_id } = req.params;
        const { name, description, value } = req.body;

        const user = await User.findByPk(user_id);

        if (!user)
            return res.status(400).json({ error: "Usuário não encontrado." });

        await Wishlist.create({
            name,
            description,
            value,
            user_id,
        
        }).then(wishlist => {
            return res.json(wishlist);
        
        }).catch(err => {
            if (!err.errors)
                return res.status(400).json({ error: "Não foi possível salvar o registro." });

            const error = [];

            err.errors.map(e => error.push(e.message));

            return res.status(400).json({ error });
        });
    },
};