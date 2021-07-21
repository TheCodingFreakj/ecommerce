const express = require("express");
const tokenAuth = require("../helpers/tokenAuth");
const UserController = require("../controllers/userController");
const router = express.Router();

// buses Routes

router.post("/add_new_user", UserController.addUser);
router.post("/login", UserController.loginuser); //if not token then cant login
router.get("/login_protected", tokenAuth, UserController.protecteduser);
router.put("/update_user/:id", tokenAuth, UserController.updatedUser);
router.delete("/delete_user/:id", tokenAuth, UserController.deleteUser);
router.post("/logout", UserController.loginout);
module.exports = router;
