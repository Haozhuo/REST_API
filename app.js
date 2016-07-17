'use strict';
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var app = express();
var jsonParser = require('body-parser').json();
var routes = require('./route.js');
var port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/newnew");
var db = mongoose.connection;

db.on('error', function(err){
    console.log(err);
});

db.once('open',function(){
    console.log("db connection successful");
});

app.use(logger('dev'));

app.use(jsonParser);

app.use('/questions', routes);

// catch 404 error
app.use(function(req, res, next){
    var err = new Error("Not found");
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        "error": {
            "message": err.message
        }
    });
});

app.listen(port, function(){
    console.log("port 3000 is running");
});
