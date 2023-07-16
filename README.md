## Middleware.js

```javascript
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
```

The `middleware.js` file exports a middleware function named `authPage`. This function takes in an array of roles and returns a middleware function that checks the authorization of the incoming request. It retrieves the token from the request headers, verifies it using the "secret" key, and checks if the decoded role is included in the allowed roles. If the role is allowed, it calls `next()` to proceed to the next middleware or route handler. Otherwise, it sends a 401 Unauthorized response.

---

## Index.js

```javascript
const express = require("express");
const { authPage } = require("./middleware");
const cors = require("cors");
const app = express();
const jwt = require("./jwt");
app.use(cors());
app.use(express.json());

app.get("/course/grades", authPage(["teacher", "admin"]), (req, res) => {
  res.json({
    nimal: 80,
    kamal: 90,
    sunil: 70,
  });
});

app.get("/", (req, res) => {
  res.json({ token: jwt.token });
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
```

The `index.js` file sets up an Express server. It imports the `authPage` middleware function from the `middleware.js` file and the `jwt` token from the `jwt.js` file. The server uses the `cors` middleware and parses incoming requests as JSON.

There are two routes defined:

- The `/course/grades` route uses the `authPage` middleware to check if the request is authorized for the roles "teacher" or "admin". If authorized, it sends a JSON response with course grades for some students.
- The root route `/` sends a JSON response containing the `jwt` token.

The server listens on port 3001.

---

## jwt.js

```javascript
var jwt = require("jsonwebtoken");

var token = jwt.sign(
  {
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    role: "admin",
  },
  "secret"
);

exports.token = token;
```

The `jwt.js` file generates a JWT (JSON Web Token) using the `jsonwebtoken` library. The token is signed with a payload containing an expiration time (`exp`) and a role (`role`). In this case, the role is set to "admins". The token is exported to be used in other parts of the application.
