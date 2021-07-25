const express = require("express");
const tokenAuth = require("../helpers/tokenAuth");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

// buses Routes

router.post("/createProduct", tokenAuth, ProductController.create);
router.get("/getallp", ProductController.getallproducts);
router.post("/viewproduct/:prod_id", tokenAuth, ProductController.viewproduct);
router.put("/update/:prod_id", tokenAuth, ProductController.update); //if not token then cant login
router.delete("/deleteproduct/:id", tokenAuth, ProductController.deletepro);

//product search
router.get("/getproducts", ProductController.getProducts);
router.get("/newarrivals",  ProductController.newarrivals);
router.post("/listBySearch", ProductController.listBySearch);

router.post("/addtocart", tokenAuth, ProductController.addtocart);
router.post("/productinstock", tokenAuth, ProductController.productinstock);
router.post("/relatedproduct", tokenAuth, ProductController.relatedproduct);

module.exports = router;
