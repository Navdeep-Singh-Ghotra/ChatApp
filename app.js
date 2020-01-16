var express = require("express");
var app = express();

var bodyParser = require("body-parser");


app.set("views", "./views")
app.set("view engine", "jade")

var fs = require("fs");
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags:'a'})
app.use(require("morgan")({stream: accessLogStream}));

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/jquery/dist"));

require('express-debug')(app, {});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res,next){
    console.log(`Incomin request from ${req.url}`);
    next();
});

app.get('/', function(req,res){
    res.render("home", { 
        title: "Home", 
        layout: "layout"
    });
});

var adminRouter = require("./admin");
app.use("/admin", adminRouter);

var apiRouter = require("./api")
app.use("/api", apiRouter);

app.listen(3000, function(){
    console.log('ChatApp listening on port 3000!');
});