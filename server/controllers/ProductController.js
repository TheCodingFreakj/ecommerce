const { cloudinary } = require("../cloudinary");

module.exports = class ProductController {
  static async create(req, res, next) {
    let image = "";
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
      console.log(req.files);
      const file = req.files.photo;

      const uploadres = await cloudinary.uploader.upload(
        file.tempFilePath,
        function (err, result) {
          image = result;
        }
      );

      console.log(image);

      const createdProduct = {};
      createdProduct.photo = image.url;
      createdProduct.name = req.body.name;
      createdProduct.desc = req.body.desc;
      createdProduct.quant = req.body.quant;
      createdProduct.price = req.body.price;
      createdProduct.shipping = req.body.shipping;

      const newProducts = await db.Products.create({
        name: createdProduct.name,
        desc: createdProduct.desc,
        quant: createdProduct.quant,
        price: createdProduct.price,
        price: createdProduct.price,
        photo: createdProduct.photo,
        shipping: createdProduct.shipping,
      });

      const cate = await db.Categories.findByPk(req.body.category);
      if (!cate) {
        return res.status(400);
      }

      const po = {
        blog_id: newProducts.prod_id,
        cat_id: cate.cat_id,
      };

      const saveCatgoryBlog = await db.Category_Blogs.create(
        po,
        { w: 1 },
        { returning: true }
      );
      return res.status(400).send({
        message: "product created",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

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
