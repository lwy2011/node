const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const moment = require("moment");

const app = express();


//配置ejs
app.set("views", "./view");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "view")));


app.get("/", (req, res) => {
    res.render("index");
});
app.get("/new", (req, res) => {
    res.render("new");
});
app.post("/new", (req, res) => {

});

app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(3000);


