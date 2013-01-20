var express = require('express'),
    routes = require('./routes'),
    orders = require('./routes/orders'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    CustomerOrder = require('./model/CustomerOrder').CustomerOrder,
    db;

// set up mongoose / mongo

mongoose.connect('mongodb://localhost/test');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    CustomerOrder.count(function(err, count){
        if (count === 0) {
            console.log('Creating an order for you');
            new CustomerOrder({
                orderNumber: 'asdasd',
                customerReference: 'werwer'
            }).save();
        }
    })
});;


// and now set up the web server
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
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/orders', orders.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
