const routes = require("express").Router();

const AuthMiddleware = require("./app/middlewares/Auth");
const UserController = require("./app/controllers/UserController");

routes.post("/users",       UserController.store);
routes.post("/login",       UserController.login);

routes.use(AuthMiddleware);

routes.get("/users",        UserController.index);
routes.get("/users/:id",    UserController.show);
routes.put("/users/:id",    UserController.update);
routes.delete("/users/:id",  UserController.destroy);

module.exports = routes;
