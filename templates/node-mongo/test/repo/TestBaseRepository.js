"use strict";

var BaseRepo = require("../../repo/BaseRepository").CustomerOrder,
	assert = require("assert");

function getViolationCountForPath(violations, path) {
	return violations.filter(function(violation) {
		return violation.path === path;
	}).length;
}

describe("CustomerOrder", function() {

	describe("validate", function() {
		var order;

		before(function() {
			order = new CustomerOrder();
		});

		it("should require an order number", function() {
			var violations = order.validate();
			assert.equal(1, getViolationCountForPath(violations, "orderNumber"));
		});

		it("should require a customer reference", function() {
			var violations = order.validate();
			assert.equal(1, getViolationCountForPath(violations, "customerReference"));
		});

	});

});