var jwt = require("jsonwebtoken");

var token = jwt.sign(
  {
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    role: "admins",
  },
  "secret"
);

exports.token = token;
