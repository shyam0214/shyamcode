const routes = require("express").Router();
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    let bearer = req["headers"]["authorization"];
    let token = bearer.split(" ")[1];
    console.log(bearer);
    if (!token) {
      return res
        .status(400)
        .send({ status: 400, message: "Token is required" });
    }
    await jwt.verify(token, "secretkey", (err, data) => {
      if (err) {
        return res.status(401).send({ status: false, message: err.message });
      }
      res.user = data;
      next();
    });
  } catch (error) {
    console.log(error.message);
  }
}

routes.get("/userList", async (req, res) => {
  try {
    let user = [
      { name: "shaym", email: "shyam@gmial.com" },
      { name: "ram", email: "ram@gmail.com" },
    ];
    return res
      .status(200)
      .send({ status: true, message: "User List", data: user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ status: false, message: error.message });
  }
});

routes.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ status: false, message: "Email and Password is required" });
    }
    if (email !== "admin@gmail.com" && password !== "admin") {
      return res
        .status(400)
        .send({ status: false, message: "Invalid Email or Password" });
    }
    let token = await jwt.sign({ email: email }, "secretkey", {
      expiresIn: "1m",
    });

    return res
      .status(200)
      .send({ status: true, message: "Login successfully", data: token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ status: false, message: error.message });
  }
});

module.exports = routes;