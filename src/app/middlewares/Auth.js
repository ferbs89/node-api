const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ error: "As credenciais não estão sendo enviadas ou são inválidas." });

    const [ scheme, token ] = authHeader.split(" ");

    try {
        decoded = jwt.verify(token, process.env.APP_SECRET);
        
        req.userId = decoded.id;

        return next();

    } catch (error) {
        return res.status(401).json({ error: "As credenciais não estão sendo enviadas ou são inválidas." });
    }
};
