const { User, Wishlist } = require('../models');

module.exports = {
	async index(req, res) {
		const { user_id } = req.params;

		if (user_id != req.userId)
			return res.status(403).json({ error: "Acesso negado." });

		const user = await User.findByPk(user_id, {
			include: {
				association: 'wishlists',
			},
			order: [
				[{ model: Wishlist, as: 'wishlists' }, 'name', 'ASC'],
			]
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

	async show(req, res) {
		const { user_id, id } = req.params;

		if (user_id != req.userId)
			return res.status(403).json({ error: "Acesso negado." });

		const wishlist = await Wishlist.findByPk(id);

		if (!wishlist)
			return res.status(400).json({ error: "Registro não encontrado." });

		if (wishlist.user_id != req.userId)
			return res.status(403).json({ error: "Acesso negado." });

		return res.json(wishlist);
	},

	async update(req, res) {
		const { user_id, id } = req.params;
		const { name, description, value } = req.body;

		if (user_id != req.userId)
			return res.status(403).json({ error: "Acesso negado." });

		const wishlist = await Wishlist.findByPk(id);

		if (!wishlist)
			return res.status(400).json({ error: "Registro não encontrado." });

		await wishlist.update({
			name,
			description,
			value,
		
		}).then(wishlist => {
			return res.send();

		}).catch(error => {
			return res.status(400).json({ error: "Não foi possível atualizar o registro." });
		});
	},

	async destroy(req, res) {
		const { id } = req.params;

		const wishlist = await Wishlist.findByPk(id);

		if (!wishlist)
			return res.status(400).json({ error: "Registro não encontrado." });

		wishlist.destroy();

		return res.send();
	},
};