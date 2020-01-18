var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var passport = require("passport");
require("./passport-init");
app.set("views", "./views");
app.set("view engine", "jade");


app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/jquery/dist"));
app.use(require("./logging.js"))

require('express-debug')(app, {});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('express-session')({
    secret: 'keyboard cat', resave: false, saveUninitialized: false
  }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    console.log(`Incomin request from ${req.url}`);
    next();
});

app.get('/', function (req, res, next) {
    setTimeout(function () {
        try {
            res.render("home", {
                title: "Home",
                layout: "layout"
            });
        } catch (error) {
            next(error);
        }
    }, 1000);
});

var adminRouter = require("./admin");
app.use("/admin", adminRouter);

var apiRouter = require("./api")
app.use("/api", apiRouter);

var authRouter = require("./auth");
app.use(authRouter);

app.use(function (error, req, res, next) {
    console.error(error);
    res.send("In error handler")
});
app.listen(3000, function () {

    console.log('ChatApp listening on port 3000!');
});