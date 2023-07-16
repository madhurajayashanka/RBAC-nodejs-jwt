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
