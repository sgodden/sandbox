"use strict";

var CustomerOrderRepository = require('../../repo/CustomerOrderRepository').CustomerOrderRepository,
	CustomerOrder = require('../../model/CustomerOrder').CustomerOrder,
	_ = require("underscore"),
	djRequire = require("dojo-node"),
	lang = djRequire("dojo/_base/lang"),
    repo = new CustomerOrderRepository();

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

exports.list = function(req, res){
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

exports.get = function(req, res) {
	doResponse(repo.findOne({ id: req.params.id }), res);
};

exports.put = insertOrUpdate;

exports.post = insertOrUpdate;

exports.delete = function(req, res) {
	doResponse(repo.remove(req.params.id), res);
}