const routes = require("express").Router();

const AuthMiddleware = require("./app/middlewares/Auth");
const UserController = require("./app/controllers/UserController");
const FavoriteController = require("./app/controllers/FavoriteController");

// Register
routes.post("/users", UserController.store);

// Login
routes.post("/login", UserController.login);

// Authentication
routes.use(AuthMiddleware);

// Users
routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.destroy);

// Favorites
routes.get("/favorites", FavoriteController.index);
routes.post("/favorites", FavoriteController.store);
routes.get("/favorites/:id", FavoriteController.show);
routes.put("/favorites/:id", FavoriteController.update);
routes.delete("/favorites/:id", FavoriteController.destroy);

// Send mail
routes.get("/mail", UserController.mail);

module.exports = routes;