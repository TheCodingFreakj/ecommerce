const express = require("express");
const router = express.Router();
const BraintreeController = require("../controllers/braintreeController");
// buses Routes

router.get("/braintree/getToken/:user_id", BraintreeController.generateToken);

module.exports = router;