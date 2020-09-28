const express = require("express");
const api = express();
// const jwt = require('jsonwebtoken');
const cors = require("cors");
api.use(express.urlencoded({ extended: true }));
api.use(express.json());
api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
api.use(cors());

api.use("/", require("./routes/routes"));

let port = process.env.PORT || 8000;

api.listen(port);
