const { cloudinary } = require("../cloudinary");
const db = require("../../models/index");
const Op = require("sequelize");

module.exports = class ProductController {
  static async create(req, res, next) {
    try {
      if (
        req.body.name === "" ||
        req.body.quant === "" ||
        req.body.desc === "" ||
        req.body.price === "" ||
        req.body.shipping === "" ||
        req.body.category === "" ||
        req.body.sold === "" ||
        req.files === "undefined"
      ) {
        return res.status(400).send({
          message: " full details",
        });
      }

      const file = req.files.photo;

      const uploadres = await cloudinary.uploader.upload(
        file.tempFilePath,
        async (err, result) => {
          const createdProduct = {};
          createdProduct.photo = result.url;
          createdProduct.name = req.body.name;
          createdProduct.desc = req.body.desc;
          createdProduct.quant = req.body.quant;
          createdProduct.price = req.body.price;
          createdProduct.sold = req.body.sold;
          createdProduct.shipping = req.body.shipping;

          console.log(createdProduct);

          const newProducts = await db.Products.create({
            prod_id: Math.floor(Math.random() * 20),
            name: createdProduct.name,
            desc: createdProduct.desc,
            quant: createdProduct.quant,
            price: createdProduct.price,
            price: createdProduct.price,
            photo: createdProduct.photo,
            sold: createdProduct.sold,
            shipping: createdProduct.shipping,
          });

          const cate = await db.Categories.findOne({
            where: { cat_id: Number(req.body.category) },
          });
          if (!cate) {
            return res.status(400);
          }

          await newProducts.addCategory(cate, {
            through: { selfGranted: false },
          });

          return res.status(200).send({
            message: "product created",
            newProducts: newProducts,
          });
        }
      );
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  static async getallproducts(req, res, next) {
    try {
      const allp = await db.Products.findAll();
      if (allp.length > 0) {
        return res.status(200).send({
          message: "produts retrieved ",
          allp: allp,
        });
      } else {
        return res.status(200).send({
          message: "No allcats found",
        });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  static async update(req, res, next) {
    console.log(req.body);
    try {
      const file = req.files.photo;

      const uploadres = await cloudinary.uploader.upload(
        file.tempFilePath,
        async (err, result) => {
          const product = await db.Products.findOne({
            where: { prod_id: req.params.prod_id },
          });
          product.photo = result.url;

          //     // Remove all current associations
          const categories2 = await product.getCategories();

          product.removeCategories(categories2);

          const cate = await db.Categories.findOne({
            where: { cat_id: Number(req.body.category) },
          });
          await product.addCategory(cate, {
            through: { selfGranted: false },
          });

          await db.Products.update(req.body, {
            where: { prod_id: req.params.prod_id },
          });

          return res.status(200).send({
            message: "product ipdated",
          });
        }
      );
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  static async deletepro(req, res, next) {
    try {
      // Get the order from the database
      const product = await db.Products.findByPk(req.params.id);

      // Find and remove all associations
      const categories = await product.getCategories();
      product.removeCategories(categories);

      // Delete order
      const producttodelete = await db.Products.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).send({
        message: "produts deleted ",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  static async viewproduct(req, res, next) {
    console.log(typeof parseInt(req.params.prod_id));
    try {
      const theProd = await db.Products.findOne({
        where: { prod_id: parseInt(req.params.prod_id) },
        include: db.Categories,
      });

      console.log(theProd);

      return res.status(200).send({
        message: "produts retrieved ",
        theProd: theProd,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  //getting the product in this price range
  //ordered by sold

  //best sellers
  static async getProducts(req, res, next) {
    let limit = req.query.limit ? parseInt(req.query.limit) : 3;
    let page = req.query.page ? parseInt(req.query.page) : 1;
    const offset = page ? page * limit : 0;

    try {
      const lowerlimit = 455;
      const upperlimit = 4553;

      let limitget = ([Op.between] = [lowerlimit, upperlimit]);
      const theProds = await db.Products.findAll({
        where: {
          sold: limitget,
        },

        order: [["sold", "desc"]],
      });

      const totalPages = Math.ceil(theProds.count / limit);
      return res.status(200).send({
        message: "produts retrieved ",
        theProds: theProds,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  //nre launched

  static async newarrivals(req, res, next) {
    try {
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  //filter high low price item with high sells

  static async addtocart(req, res, next) {
    try {
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  static async productinstock(req, res, next) {
    try {
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  static async relatedproduct(req, res, next) {
    try {
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }
};

//find all orders belinging to a customer
//https://maximorlov.com/6-common-sequelize-queries-rewritten-in-sql/
