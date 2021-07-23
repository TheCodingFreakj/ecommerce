"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
console.log(config);
const db = {};

let sequelize;
if (env === "production") {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    protocol: "postgres",
    dialect: config.dialect,
    port: 5432,
    logging: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Users = require("./user")(sequelize, Sequelize);
db.Categories = require("./category")(sequelize, Sequelize);
db.Products = require("./product")(sequelize, Sequelize);
db.Category_Products = require("./Category_Product")(sequelize, Sequelize);


db.Products.belongsToMany(db.Categories, { through: db.Category_Products });
db.Categories.belongsToMany(db.Products, { through: db.Category_Products });

module.exports = db;
