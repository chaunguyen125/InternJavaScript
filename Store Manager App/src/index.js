var express = require('express');
var app = express();
const logger = require('morgan');
const bodyParser = require("body-parser");
const db = require('./config/postgres.config');
const route = require('./routes/routes');
// response from form
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
        limit: "50mb",
    })
);
app.use(bodyParser.json({ limit: "50mb" }));

//route

//logger
app.use(logger("combined"));
//Connect db
route(app);
db.connectDb();


// app.get('/', function (req, res) {
//    res.send('Hello World');
// })


var server = app.listen(3001, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("connect app");
})