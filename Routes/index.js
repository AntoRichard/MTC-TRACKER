const express = require("express");
const path = require("path");
const { IndexGet } = require(path.join("..", "controllers", "indexRoute"));

const Route = express.Router();

Route.get("/index", IndexGet);

module.exports = Route;
