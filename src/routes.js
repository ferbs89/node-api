const routes = require("express").Router();

const AuthMiddleware = require("./app/middlewares/Auth");
const SessionController = require("./app/controllers/SessionController");
const UserController = require("./app/controllers/UserController");
const FinanceController = require("./app/controllers/FinanceController");
const WishlistController = require("./app/controllers/WishlistController");
const MailController = require("./app/controllers/MailController");

const BullBoard = require("bull-board");
const Queue = require("./lib/Queue");

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

// Finance
routes.get("/users/:user_id/finances", FinanceController.index);
routes.get("/users/:user_id/finances/:id", FinanceController.show);
routes.post("/users/:user_id/finances", FinanceController.store);
routes.put("/users/:user_id/finances/:id", FinanceController.update);
routes.delete("/finances/:id", FinanceController.destroy);

// Wishlist
routes.get("/users/:user_id/wishlist", WishlistController.index);
routes.get("/users/:user_id/wishlist/:id", WishlistController.show);
routes.post("/users/:user_id/wishlist", WishlistController.store);
routes.put("/users/:user_id/wishlist/:id", WishlistController.update);
routes.delete("/wishlist/:id", WishlistController.destroy);

// Mail
routes.get("/mail", MailController.send);

module.exports = routes;