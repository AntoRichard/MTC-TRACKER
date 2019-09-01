const express = require("express");
const path = require("path");
const { ChartGet } = require(path.join("..", "controllers", "chartRoute"));

const Route = express.Router();

Route.get("/chart", ChartGet);

module.exports = Route;
