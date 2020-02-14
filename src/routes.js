const routes = require("express").Router();

const AuthMiddleware = require("./app/middlewares/Auth");
const UserController = require("./app/controllers/UserController");
const FavoriteController = require("./app/controllers/FavoriteController");
const MailController = require("./app/controllers/MailController");

const BullBoard = require("bull-board");
const Queue = require("./app/libs/Queue");

BullBoard.setQueues(Queue);
routes.use("/queues", BullBoard.UI);

// Register
routes.post("/users", UserController.store);

// Login
routes.post("/login", UserController.login);

// Mail
routes.get("/mail", MailController.send);

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

module.exports = routes;