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
        .catch(error => {
            return res.status(400).send(error.message);
        });
    },
};
