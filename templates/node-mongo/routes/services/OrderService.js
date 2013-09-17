"use strict";

var CustomerOrderRepository = require('../../repo/CustomerOrderRepository').CustomerOrderRepository,
	CustomerOrder = require('../../model/CustomerOrder').CustomerOrder,
	_ = require("underscore"),
	djRequire = require("dojo-node"),
	lang = djRequire("dojo/_base/lang"),
    repo = new CustomerOrderRepository(),
	OrderService;

function cleanObject(object) {
	var key, value;
	for (key in object) {
		if (object.hasOwnProperty(key)) {
			value = object[key];
			if (typeof value === "string" && value.length === 0) {
				object[key] = null;
			}
		}
	}
	if (object.bookingDate) {
		object.bookingDate = new Date(object.bookingDate); // must be in ISO format
	}
}

function doResponse(deferred, res) {
	deferred.then(
		function(result) {
			res.send(result ? result : { status: "ok" });
		},
		function(violations) {
			res.status(400).send({ violations: violations });
		}
	);
}

function insertOrUpdate(req, res) {
	var dto = req.body, method;
	cleanObject(dto);
	method = dto.id ? 'updateById' : 'insert';
	doResponse(repo[method](new CustomerOrder(dto)), res);
}

/**
 * An order service.
 * @constructor
 */
OrderService = function() {};

/**
 * Lists all orders.
 * @param req request.
 * @param res response.
 */
OrderService.prototype.list = function(req, res){
    var doList = function() {
        repo.findAll().then(function(docs){
            res.send(docs);
        });
    };

	repo.foo = "bar";
	console.log(repo.foo);

    repo.count().then(function(count){
        if (count === 0) {
            console.log('There are no orders - inserting some');
			var orders = [];
			_.times(10, function(idx){
				orders.push(new CustomerOrder({
					orderNumber: "O000000" + (idx + 1),
					customerReference: "CR0000" + (idx + 1)
				}));
			});
            repo.insert(orders).then(doList);
        }
        else {
            doList();
        }
    });
};

/**
 * Returns an order by its id.
 * @param req request.
 * @param res response.
 */
OrderService.prototype.get = function(req, res) {
	doResponse(repo.findOne({ id: req.params.id }), res);
};

/**
 * Updates an order.
 * @param req request.
 * @param res response.
 */
OrderService.prototype.put = function(req, res) {
	insertOrUpdate(req, res);
};

/**
 * Creates a new order.
 * @param req request.
 * @param res response.
 */
OrderService.prototype.post = function(req, res) {
	insertOrUpdate(req, res);
};

/**
 * Deletes an order by its id.
 * @param req request.
 * @param res response.
 */
OrderService.prototype.delete = function(req, res) {
	doResponse(repo.remove(req.params.id), res);
};

Object.freeze(OrderService.prototype);

exports.OrderService = OrderService;