const express = require("express");
const router = express.Router();
const BraintreeController = require("../controllers/braintreeController");
// buses Routes

router.get("/braintree/getToken/:user_id", BraintreeController.generateToken);
router.get("/braintree/payment/:user_id", BraintreeController.processPayment);

module.exports = router;