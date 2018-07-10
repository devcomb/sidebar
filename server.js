var express = require("express");
var app = express();
var router = express.Router();

router.use(function (req, res, next) {
    console.log("/%s",req.method);
    next();
});

router.get('/', function(req, res){
    console.log("homepage");
    res.send("Hello World!!!!!!");
});

router.get('/rose', function(req, res){
    console.log("rose page");
    res.sendFile(__dirname + '/views/image.html');
});

router.get('/json', function(req, res){
    console.log("json page");
    res.json({
        value: "test"
    });
});
app.use("/", router);

app.use('/images', express.static('/images'));

var server = app.listen(0, function(){
    console.log("started server on port %s", server.address().port);
});

module.exports = server;