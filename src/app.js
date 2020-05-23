const express = require("express");
const cors = require("cors");

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(express.json());
    }

    routes() {
        this.server.use("/api", require("./routes"));
    }
}

module.exports = new App().server;