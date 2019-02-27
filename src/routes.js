const routes = require("express").Router();

const AuthMiddleware = require("./app/middlewares/Auth");
const UserController = require("./app/controllers/UserController");

routes.post("/login", UserController.login);
routes.post("/users", UserController.store);

routes.use(AuthMiddleware);

routes.get("/users", UserController.index);

module.exports = routes;
