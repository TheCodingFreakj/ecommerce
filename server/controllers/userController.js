const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../models/index");

const User = db.Users;

module.exports = class UserController {
  static async isAuth(req, res, next) {
    try {
      const authUserID = req.user.id; //the id from the tokenAuth middleware
      const authuser = await UserService.getAUser(authUserID);

      if (authuser.role != 1) {
        util.setError(
          400,
          "we dont give admins to access this page.Login as admin"
        );
        return util.send(res);
      }
      req.user = authuser;
      next();
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async isAdmin(req, res, next) {
    try {
      const adminUserID = req.user.id; //the id from the tokenAuth middleware
      const adminuser = await UserService.getAUser(adminUserID);
      console.log(adminuser);
      if (!adminuser) {
        util.setError(400, "Thre is no admin with this username");
        return util.send(res);
      }
      if (adminuser.role != 1) {
        util.setError(400, "Dear user you dont have access to admin pages");
        return util.send(res);
      }

      req.user = adminuser;
      next();
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
  static async addUser(req, res) {
    console.log(req.body);
    try {
      if (
        !req.body.username ||
        !req.body.email ||
        !req.body.password ||
        !req.body.role
      ) {
        return res.status(400).json({
          message: "provide full details",
        });
      }
      const newuser = req.body;
      const oldUser = await await db.Users.findOne({
        attributes: ["id", "email", "username", "password", "role"],
        where: { email: req.body.email },
      });
      // console.log(newuser);
      // console.log(oldUser);
      if (oldUser) {
        return res.status(400).json({
          message: "enail exists",
        });
      }

      const createdUser = await db.Users.create(newuser);
      console.log(createdUser);
      const payload = {
        user: createdUser,
      };

      const token = jwt.sign(payload, "adddasdasda", {
        expiresIn: "1d",
      });
      return res.status(200).send({
        token: token,
        user: createdUser,
        message: "Sign Up Done.. Please Sign In And Shop ",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  static async loginuser(req, res) {
    console.log(req.body);
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({
          message: "provide full details",
        });
      }

      const oldUser = await db.Users.findOne({
        attributes: ["id", "email", "username", "password", "role"],
        where: { email: req.body.email },
      });

      console.log(oldUser);
      const passwordfrontend = req.body.password;
      const oldPassword = oldUser.password;
      // console.log(passwordfrontend);
      // console.log(oldPassword);
      await bcrypt.compareSync(passwordfrontend, oldPassword);
      //console.log(bcrypt.compareSync(passwordfrontend, oldPassword));
      if (!(await bcrypt.compareSync(passwordfrontend, oldPassword))) {
        return res.status(400).json({
          message: "passwords dont match",
        });
      }
      const fetcheduser = await db.Users.findOne({
        attributes: ["id", "username", "email", "role"],
        where: { id: oldUser.id },
      });

      const payload = {
        user: fetcheduser,
      };
      // console.log(process.env.JWT_SECRET);

      let token;

      token = jwt.sign(payload, "adddasdasda", { expiresIn: "1h" });
      res.cookie("token", token, { expiresIn: "1d" });
      return res.status(200).send({
        message: "login done",
        token: token,
        user: fetcheduser,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  static async protecteduser(req, res) {
    try {
      const fetcheduser = await db.Users.findOne({
        attributes: ["id", "username", "email", "role"],
        where: { id: Number(id) },
      });

      if (!fetcheduser) {
        return res.status(400).json({
          message: `Cannot find user with the id ${req.user.id}`,
        });
      } else {
        return res.status(200).json({
          fetcheduser: fetcheduser,
        });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }
  static async updatedUser(req, res) {
    try {
      const { id } = req.params;

      const updateUser = await db.Users.update(req.body, {
        where: { id: id },
      });
      if (!updateUser) {
        return res.status(400).json({
          message: `Cannot find user with the id ${req.user.id}`,
        });
      } else {
        return res.status(200).json({
          updateUser: updateUser,
        });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const userToDelete = db.Users.findOne({
        where: { id: Number(id) },
      });

      if (userToDelete) {
        return res.status(200).json({
          message: "user deleted",
        });
      } else {
        return res.status(400).json({
          message: `Cannot find user with the id ${req.user.id}`,
        });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }
  static async loginout(req, res) {
    try {
      res.clearCookie("token");

      return res.status(200).json({
        message: "Sign Out Success,",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }
};
