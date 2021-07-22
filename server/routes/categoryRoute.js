const express = require("express");
const tokenAuth = require("../helpers/tokenAuth");
const CategoryController = require("../controllers/CategoryController");
const router = express.Router();

// buses Routes
router.post("/createcat", tokenAuth, CategoryController.createcat);
router.get("/fetchAll", CategoryController.FetchAll); //if not token then cant login
router.delete("/delete/:cat_id", tokenAuth, CategoryController.delete);
module.exports = router;
