var jwt = require("jsonwebtoken");

var authPage = function authPage(roles) {
  return function (req, res, next) {
    var token = req.headers.authorization.split(" ")[1];
    token = token.replace("Bearer ", "");

    console.log(token);
    var decoded = jwt.verify(token, "secret");
    var userRole = decoded.role;

    if (roles.includes(userRole)) {
      next();
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  };
};

module.exports = { authPage: authPage };
