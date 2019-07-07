
const express = require("express");
const path = require("path");
const app = express();


const PORT = process.env.PORT || 3000;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));

app.use("./routes/apiGetRoutes");
app.use("./routes/apiPostRoutes");
//app.use("./routes/apiPutRoutes");
//app.use("./routes/apiDeleteRoutes");
app.use("./routes/htmlRoutes");

db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT: " + PORT);
    });
});