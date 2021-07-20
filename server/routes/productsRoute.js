const express = require("express");
const tokenAuth = require("../helpers/tokenAuth");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

// buses Routes

router.post("/createProduct", tokenAuth, ProductController.create);
router.post("/viewproduct/:prod_id", tokenAuth, ProductController.viewproduct);
router.put("/update/:prod_id", tokenAuth, ProductController.update); //if not token then cant login
router.delete("/delete/:prod_id", tokenAuth, ProductController.delete);
//router.get("/getall", ProductController.getall);
router.post("/getproductbyid", tokenAuth, ProductController.productbyid);
router.post("/getproductbycat", tokenAuth, ProductController.productbycat);
router.post("/newarrivals", tokenAuth, ProductController.newarrivals);
router.post("/bestsellers", tokenAuth, ProductController.bestsellers);
router.post("/addtocart", tokenAuth, ProductController.addtocart);
router.post("/productinstock", tokenAuth, ProductController.productinstock);
router.post("/relatedproduct", tokenAuth, ProductController.relatedproduct);

module.exports = router;
