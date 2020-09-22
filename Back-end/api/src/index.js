const express = require("express");
const api = express();

api.use(express.urlencoded({ extended: true }));
api.use(express.json());
api.use('/', require('./routes/routes'));

let port = process.env.PORT || 8000;

api.listen(port);

