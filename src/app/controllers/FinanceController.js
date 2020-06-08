const { User, Finance } = require('../models');

module.exports = {
	async index(req, res) {
		const { user_id } = req.params;

		if (user_id != req.userId)
			return res.status(403).json({ error: "Acesso negado." });

		const user = await User.findByPk(user_id, {
			include: {
				association: 'finances',
			},
			order: [
				[{ model: Finance, as: 'finances' }, 'date', 'ASC'],
				[{ model: Finance, as: 'finances' }, 'description', 'ASC'],
			]
		});

		if (!user)
			return res.status(400).json({ error: "Usuário não encontrado." });

		return res.json(user.finances);
	},

	async store(req, res) {
		const { user_id } = req.params;
		const { date, description, type, value } = req.body;

		const user = await User.findByPk(user_id);

		if (!user)
			return res.status(400).json({ error: "Usuário não encontrado." });

		await Finance.create({
			date,
			description,
			type,
			value,
			user_id,
		
		}).then(finance => {
			return res.json(finance);
		
		}).catch(err => {
			if (!err.errors)
				return res.status(400).json({ error: "Não foi possível salvar o registro." });

			const error = [];
			err.errors.map(e => error.push(e.message));

			return res.status(400).json({ error });
		});
	},

	async update(req, res) {
		const { user_id, id } = req.params;
		const { date, description, type, value } = req.body;

		if (user_id != req.userId)
			return res.status(403).json({ error: "Acesso negado." });

		const finance = await Finance.findByPk(id);

		if (!finance)
			return res.status(400).json({ error: "Registro não encontrado." });

		await finance.update({
			date,
			description,
			type,
			value,
		
		}).then(finance => {
			return res.send();

		}).catch(error => {
			return res.status(400).json({ error: "Não foi possível atualizar o registro." });
		});
	},
};