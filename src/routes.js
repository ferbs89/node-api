const routes = require("express").Router();

const UserController = require("./app/controllers/UserController");

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);
routes.post("/login", UserController.login);

module.exports = routes;
