"use strict";

var CustomerOrderRepository = require('../../repo/CustomerOrderRepository').CustomerOrderRepository,
	CustomerOrder = require('../../model/CustomerOrder').CustomerOrder,
	_ = require("underscore"),
	djRequire = require("dojo-node"),
	lang = djRequire("dojo/_base/lang"),
    repo = new CustomerOrderRepository();

exports.list = function(req, res){
    var doList = function() {
        repo.findAll().then(function(docs){
            res.send(docs);
        });
    };

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
	var query = {
		id: req.params.id
	};
	repo.findOne(query).then(function(order) {
		res.send(order);
	});
};

exports.put = function(req, res) {
	var dto = req.body;
	if (dto.bookingDate) {
		dto.bookingDate = new Date(dto.bookingDate); // must be in ISO format
	}
	repo.updateById(dto).then(function() {
		res.send({ status: "ok" });
	});
};

exports.post = function(req, res) {
	if (!req.body.bookingDate) {
		req.body.bookingDate = new Date();
	}
	repo.insert(req.body).then(function() {
		res.send({ status: "ok" })
	});
}