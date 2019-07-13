
const express = require("express");
const session = require("express-session");
require("dotenv").config();
var passport = require("./config/passport");


const bodyParser = require("body-parser");
const path = require("path");
const app = express();

console.log(process.env.AWS_ACCESS_ID_KEY);
const PORT = process.env.PORT || 3000;
const db = require("./models");


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({
    secret: process.env.SESS_SECRET, resave: true, saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const apiPostRoutes = require("./routes/apiPostRoutes");
const apiProductImages = require("./routes/apiProductImages");
const apiGetRoutes = require("./routes/apiGetRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
app.use(apiPostRoutes);
app.use(apiProductImages);
app.use(apiGetRoutes);
//app.use("./routes/apiPutRoutes");
//app.use("./routes/apiDeleteRoutes");
app.use(htmlRoutes);

db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT: " + PORT);
    });
});
