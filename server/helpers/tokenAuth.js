const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(req.headers["authorization"]);
  const token = authHeader && authHeader.split(" ")[1];

  //const token = req.headers["authorization"]

  console.log(
    "As i hit the route the sign up method generated a token which is passed here for verification for signin",
    token
  );
  if (!token) {
    return res.status(401).json({
      message: "No token, You are not authorized to enter this route",
    });
  } //This fires when token is not atal present

  // Verify token
  try {
    jwt.verify(token, "adddasdasda", (error, decoded) => {
      console.log(error);
      console.log("the decoded user", decoded);
      if (error) {
        return res.status(401).json({
          //This fires when token is mutated
          message: "This token with which you want to access is not correct",
        });
      } else {
        req.user = decoded.user; //this is the payout // we can use this req.user that had verified token in any of the routes
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ message: "Server Error" });
  }
};
