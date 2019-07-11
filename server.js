
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();


const PORT = process.env.PORT || 3000;
const TWOHOURS = 1000 * 60 * 60;

const { NODE_ENV = 'development',
    SESS_LIFETIME = TWOHOURS,
    SESS_NAME = 'sid',
    SESS_SECRET = 'ssh!quit,it\'asecret!' } = process.env

const IN_PROD = NODE_ENV === 'production'
const db = require("./models");

app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}));


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join("public")));

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
