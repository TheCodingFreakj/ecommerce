const db = require("../../models/index");
const slugify = require("slugify");
module.exports = class CategoryController {
  static async createcat(req, res, next) {
    console.log(req.body.category);
    try {
      if (!req.body.category) {
        return res.status(200).send({
          message: "provide full details",
        });
      }

      const newCate = await db.Categories.create({
        id: Math.floor(Math.random() * 20),
        name: req.body.category,
        slug: slugify(req.body.category).toLowerCase(),
        cat_id: Math.floor(Math.random() * 20),
      });
      console.log(newCate);
      return res.status(200).send({
        message: "new category added ",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  static async FetchAll(req, res, next) {
    try {
      const allcats = await db.Categories.findAll();
      if (allcats.length > 0) {
        return res.status(200).send({
          message: "categories retrieved ",
          allcats: allcats,
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

  static async delete(req, res, next) {
    try {
      const catToDelete = await db.Categories.findOne({
        where: { cat_id: Number(req.params.cat_id) },
      });

      if (catToDelete) {
        const deletedcat = await db.Categories.destroy({
          where: { cat_id: Number(req.params.cat_id) },
        });
      }

      return res.status(200).send({
        message: "category delete",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }
};
