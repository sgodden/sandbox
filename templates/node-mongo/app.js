"use strict";

/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    orders = require('./routes/orders'),
    ordersService = require("./routes/services/orders"),
    http = require('http'),
    path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public-dojo')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get("/services/orders/", ordersService.list);
app.get("/services/orders/:id", ordersService.get);
app.put("/services/orders/:id", ordersService.put);
app.post("/services/orders/", ordersService.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
