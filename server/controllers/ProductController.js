const { cloudinary } = require("../cloudinary");
const db = require("../../models/index");
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
            shipping: createdProduct.shipping,
          });

          console.log(newProducts);

          const cate = await db.Categories.findOne({
            where: { name: req.body.category },
          });
          if (!cate) {
            return res.status(400);
          }

          const po = {
            prod_id: newProducts.prod_id,
            cat_id: cate.cat_id,
          };

          // Create and save a productOrder
          const saveCatgoryBlog = await db.Category_Products.create(
            po,
            { w: 1 },
            { returning: true }
          );

          return res.status(200).send({
            message: "product created",
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
  //https://sequelize.org/master/manual/advanced-many-to-many.html
  static async update(req, res, next) {
    try {
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  static async delete(req, res, next) {
    try {
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  static async viewproduct(req, res, next) {
    try {
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  static async productbyid(req, res, next) {
    try {
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  static async productbycat(req, res, next) {
    try {
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  static async newarrivals(req, res, next) {
    try {
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  static async bestsellers(req, res, next) {
    try {
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

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

  static async delete(req, res, next) {
    try {
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }
};
