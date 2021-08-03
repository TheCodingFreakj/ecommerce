const db = require("../../models/index");
require("dotenv").config();
const braintree = require("braintree");
// BRAIN_TREE_MERCHANTID=8kqhm48tnfjxmswb
// BRAIN_TREE_PUBLIC_KEY=tc85jjp72tjvycn2
// BRAIN_TREE_PRIVATE_KEY=25da9ae2dc5a52097b8cf585ab9705b6

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAIN_TREE_MERCHANTID,
  publicKey: process.env.BRAIN_TREE_PUBLIC_KEY,
  privateKey: process.env.BRAIN_TREE_PRIVATE_KEY,
});

module.exports = class BraintreeController {
  static async generateToken(req, res, next) {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          return res.status(500).send(err);
        } else {
          return res.status(200).send(response);
        }
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }

  static async processPayment(req, res, next) {
    console.log(req.body);
    try {
      let noncefromclient = req.body.paymentdatasent.paymentMethodNonce;
      let amounfromclient = req.body.paymentdatasent.amounfromclient;
      let newcherge = gateway.transaction.sale(
        {
          amount: amounfromclient,
          paymentMethodNonce: noncefromclient,
          options: {
            submitForSettlement: true,
          },
        },
        function (err, result) {
          if (err) {
            return res.status(200).send(err);
          } else {
            return res.status(200).send(result);
          }
        }
      );
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send("the request done is falsy..try again with right credentials");
    }
  }
};
