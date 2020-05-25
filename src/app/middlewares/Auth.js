const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const errorMessage = "Acesso negado.";

    if (!authHeader)
        return res.status(401).json({ error: errorMessage });

    const [ scheme, token ] = authHeader.split(" ");

    try {
        const { id } = jwt.verify(token, process.env.APP_SECRET);
        const user = await User.findByPk(id);

        if (!user)
            return res.status(401).json({ error: errorMessage });

        req.userId = user.id;

        return next();

    } catch (error) {
        return res.status(401).json({ error: errorMessage });
    }
};