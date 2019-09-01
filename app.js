const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require('path');

const IndexRoute = require('./Routes/index');
const ChartRoute = require('./Routes/chart');
const MapRoute = require('./Routes/map');

const PORT = 3000;
const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));

app.use(IndexRoute);
app.use(ChartRoute);
app.use(MapRoute);

app.listen(PORT || process.env.PORT, () => console.log(`Server is running in PORT : ${PORT}`));
