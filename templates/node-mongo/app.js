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
	isLoggedIn,
	redirectToLogin,
	forbidIfNotLoggedIn,
	app;

/*-------------------------
 * Everyauth configuration
 * ------------------------ */
everyauth.debug = false;

everyauth.everymodule.findUserById(function (userId, callback) {
	userRepo.findOne({username: userId}).then(function (user) {
		callback(null, user);
	});
});

everyauth
	.password
	.userPkey("username")
	.getLoginPath('/login')
	.postLoginPath('/login')
	.loginView('login.jade')
	.loginLocals(function (req, res, done) {
		setTimeout(function () {
			done(null, {
				title: 'Async login',
				everyauth: everyauth
			});
		}, 200);
	})
	.authenticate(function (login, password) {
		var pr = this.Promise();
		userRepo.findOne({username: login}).then(function (user) {
			// TODO - check the password
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
	.registerLocals(function (req, res, done) {
		setTimeout(function () {
			done(null, {
				title: 'Async Register'
			});
		}, 200);
	})
	.validateRegistration(function (newUserAttrs, errors) {
		var login = newUserAttrs.login;
		if (usersByLogin[login]) errors.push('Login already taken');
		return errors;
	})
	.registerUser(function (newUserAttrs) {
		var login = newUserAttrs[this.loginKey()];
		return usersByLogin[login] = addUser(newUserAttrs);
	})
	.loginSuccessRedirect('/site.html')
	.registerSuccessRedirect('/');

/*-----------------------------
 * Express app configuration
 * ----------------------------*/
app = express();

isLoggedIn = function(req) {
	return req.session && req.session.auth && req.session.auth.loggedIn;
};

forbidIfNotLoggedIn = function(req, res, next) {
	if (!isLoggedIn(req)) {
		res.status(403).send("Get out of it");
	} else {
		next();
	}
}

redirectToLogin = function(req, res, next) {
	if (!isLoggedIn(req)) {
		console.log("Not logged in");
		res.redirect("/login");
	} else {
		// all is in order
		next();
	}
};

app.configure(function () {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.cookieSession({secret: "27yaSpes2uphequ8"}));

	app.get("/site.html", function (req, res, next) {
		console.log("Accessing site");
		redirectToLogin(req, res, next);
	});

	app.use(express.static(path.join(__dirname, 'public-dojo')));
	app.use(express.methodOverride());
//  app.use(express.csrf());
	app.use(app.router);
	app.use(everyauth.middleware());
});

app.configure('development', function () {
	app.use(express.errorHandler());
});


app.get("/services/*", function (req, res, next) {
	forbidIfNotLoggedIn(req, res, next);
});

app.get("/services/orders/", ordersService.list);
app.get("/services/orders/:id", ordersService.get);
app.put("/services/orders/:id", ordersService.put);
app.post("/services/orders/", ordersService.post);

// let's create some users if there are none already
userRepo.count().then(function (count) {
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

http.createServer(app).listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});
