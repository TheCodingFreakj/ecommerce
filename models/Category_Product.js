"use strict";
const { Model } = require("sequelize");
const db = require("./index");
module.exports = (sequelize, DataTypes) => {
  class Category_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category_Product.init(
    {
      prod_id: DataTypes.STRING,
      cat_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category_Product",
    }
  );
  return Category_Product;
};
