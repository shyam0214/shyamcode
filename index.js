const express = require("express");
const routes = require("./routes");
const res = require("express/lib/response");
const app = express();
let port = 3000;
app.use(express.json());
app.use("/api", routes);
app.use("/", (req, res) => {
  res.send("Welcome to the sh       yam");
});
app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Server is running on port ${port}`);
});
