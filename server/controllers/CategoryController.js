module.exports = class CategoryController {
  static async create(req, res, next) {
    try {
      if (!req.body.cat_name) {
        return res.status(200).send({
          message: "provide full details",
        });
      }

      const newCate = await db.Categories.create(newCatg).then(function (cat) {
        console.log("task", cat);
        return cat;
      });

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
        where: { id: Number(id) },
      });

      if (catToDelete) {
        const deletedcat = await db.Categories.destroy({
          where: { cat_id: Number(cat_id) },
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
