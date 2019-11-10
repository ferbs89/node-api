const { Favorite } = require("../models");

module.exports = {
    async index(req, res) {
        const favorites = await Favorite.findAll({
            order: [
                ["name", "ASC"],
            ]
        });

        return res.json({ favorites });
    },

    async store(req, res) {
        await Favorite.create(
            req.body
        ).then(favorite => {
            return res.json({ favorite });
        }).catch(err => {
            if (!err.errors)
                return res.status(400).json({ error: "Não foi possível salvar o favorito." });

            const error = [];

            err.errors.map(e => error.push(e.message));

            return res.status(400).json({ error });
        });
    },

    async show(req, res) {
        const favorite = await Favorite.findByPk(req.params.id);

        if (!favorite)
            return res.status(400).json({ error: "Favorito não encontrado." });

        return res.json({ favorite });
    },

    async update(req, res) {
        const favorite = await Favorite.findByPk(req.params.id);

        if (!favorite)
            return res.status(400).json({ error: "Favorito não encontrado." });

        await fav.update(req.body);

        return res.json({ favorite });
    },

    async destroy(req, res) {
        const favorite = await Favorite.findByPk(req.params.id);

        if (!favorite)
            return res.status(400).json({ error: "Favorito não encontrado." });

        favorite.destroy();

        return res.send();
    }
};
