const { User } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
	async login(req, res) {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });

		if (!user || user.password != password)
			return res.status(401).json({ error: "E-mail ou senha inválidos." });

		const token = jwt.sign({ 
			id: user.id,
			name: user.name,
			email: user.email,
		}, process.env.APP_SECRET);

		return res.json({ token });
	}
};