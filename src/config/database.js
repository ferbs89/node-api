require("dotenv").config();

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: "postgres",
  dialectOptions: {
    ssl: true
  },
  operatorsAliases: false,
  logging: false,
  define: {
    timestamps: true,
    paranoid: true,
    underscored: true,
    underscoredAll: true,
  }
};
