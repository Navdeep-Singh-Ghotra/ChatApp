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

app.get('/', function(req,res, next){
    setTimeout(function(){
    try{
    throw new Error("abc");
    res.render("home", { 
        title: "Home", 
        layout: "layout"
    });
}catch(error){
    next(error);
}
    },1000);
    

});

var adminRouter = require("./admin");
app.use("/admin", adminRouter);

var apiRouter = require("./api")
app.use("/api", apiRouter);

app.use(function(error, req,res,next){
    console.error(error);
    res.send("In error handler")
});
app.listen(3000, function(){

    console.log('ChatApp listening on port 3000!');
});