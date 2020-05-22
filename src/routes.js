const routes = require("express").Router();

const AuthMiddleware = require("./app/middlewares/Auth");
const SessionController = require("./app/controllers/SessionController");
const UserController = require("./app/controllers/UserController");
const WishlistController = require("./app/controllers/WishlistController");
const MailController = require("./app/controllers/MailController");

const BullBoard = require("bull-board");
const Queue = require("./app/libs/Queue");

BullBoard.setQueues(Queue);
routes.use("/queues", BullBoard.UI);

// Login
routes.post("/login", SessionController.login);

// Register
routes.post("/users", UserController.store);

// Authentication
routes.use(AuthMiddleware);

// User
routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.destroy);

// Wishlist
routes.get("/users/:user_id/wishlist", WishlistController.index);
routes.post("/users/:user_id/wishlist", WishlistController.store);

// Mail
routes.get("/mail", MailController.send);

module.exports = routes;