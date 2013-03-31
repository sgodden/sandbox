"use strict";

/**
 * Module dependencies.
 */
var express = require('express'),
    routes = require('./routes'),
    orders = require('./routes/orders'),
    ordersService = require("./routes/services/orders"),
    http = require('http'),
    path = require('path'),
	UserRepository = require("./repo/UserRepository"),
	userRepo = new UserRepository(),
	everyauth = require("everyauth"),
	Promise = require("everyauth/lib/Promise");

everyauth.debug = true;

var usersById = {};
var nextUserId = 0;
var usersByLogin = {
	'brian@example.com': addUser({ login: 'brian@example.com', password: 'password'})
};

function addUser (source, sourceUser) {
	var user;
	if (arguments.length === 1) { // password-based
		user = sourceUser = source;
		user.id = ++nextUserId;
		return usersById[nextUserId] = user;
	} else { // non-password-based
		user = usersById[++nextUserId] = {id: nextUserId};
		user[source] = sourceUser;
	}
	return user;
}

everyauth
	.password
	.getLoginPath('/login')
	.postLoginPath('/login')
	.loginView('login.jade')
	.loginLocals( function (req, res, done) {
		setTimeout( function () {
			done(null, {
				title: 'Async login',
				everyauth: everyauth
			});
		}, 200);
	})
	.authenticate( function (login, password) {
		var pr = new Promise();
//		var errors = [];
//		if (!login) errors.push('Missing login');
//		if (!password) errors.push('Missing password');
//		if (errors.length) return errors;
//		var user = usersByLogin[login];
//		if (!user) return ['Login failed'];
//		if (user.password !== password) return ['Login failed'];
//		return user;
		userRepo.findOne({username: login}).then(function(user) {
			if (user) {
				pr.fulfill(user);
			}
			else {
				pr.fulfill(["User or password incorrect"]);
			}
		});
		return pr;
	})
	.getRegisterPath('/register')
	.postRegisterPath('/register')
	.registerView('register.jade')
//    .registerLocals({
//      title: 'Register'
//    })
//    .registerLocals(function (req, res) {
//      return {
//        title: 'Sync Register'
//      }
//    })
	.registerLocals( function (req, res, done) {
		setTimeout( function () {
			done(null, {
				title: 'Async Register'
			});
		}, 200);
	})
	.validateRegistration( function (newUserAttrs, errors) {
		var login = newUserAttrs.login;
		if (usersByLogin[login]) errors.push('Login already taken');
		return errors;
	})
	.registerUser( function (newUserAttrs) {
		var login = newUserAttrs[this.loginKey()];
		return usersByLogin[login] = addUser(newUserAttrs);
	})
	.loginSuccessRedirect('/')
	.registerSuccessRedirect('/');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.static(path.join(__dirname, 'public-dojo')));
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.cookieSession({secret: "27yaSpes2uphequ8"}));
//  app.use(express.csrf());
  app.use(app.router);
  app.use(everyauth.middleware());
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get("/services/orders/", ordersService.list);
app.get("/services/orders/:id", ordersService.get);
app.put("/services/orders/:id", ordersService.put);
app.post("/services/orders/", ordersService.post);

// let's create some users if there are none already
userRepo.count().then(function(count) {
	if (count === 0) {
		userRepo.insert([
			{
				username: "user",
				password: "user",
				fullname: "John Smith",
				roles: ["USER"]
			},
			{
				username: "admin",
				password: "admin",
				fullname: "John Smith",
				roles: ["USER", "ADMIN"]
			}
		]);
	}
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
