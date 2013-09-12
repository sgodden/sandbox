"use strict";

var CustomerOrder,
	ObjectValidator = require("./validation/ObjectValidator").ObjectValidator,
	djRequire = require("dojo-node"),
	lang = djRequire("dojo/_base/lang");

/**
 * @class CustomerOrder.
 * @constructor
 */
CustomerOrder = function(args) {
    /*
     * Private properties.
     */
	var id = null;
    var orderNumber = null;
    var customerReference = null;
	var bookingDate = new Date();

	/**
	 * @field
	 * @type {string}
	 */
    Object.defineProperty(this, 'id', {
        enumerable: true,
        get: function() {
            return id;
        },
        set: function(value) {
            id = value;
        }
    });

    Object.defineProperty(this, 'orderNumber', {
        enumerable: true,
        get: function() {
            return orderNumber;
        },
        set: function(value) {
            orderNumber = value;
        }
    });

    Object.defineProperty(this, 'customerReference', {
        enumerable: true,
        get: function() {
            return customerReference;
        },
        set: function(value) {
            customerReference = value;
        }
    });

    Object.defineProperty(this, 'bookingDate', {
        enumerable: true,
        get: function() {
            return bookingDate;
        },
        set: function(value) {
            bookingDate = value;
        }
    });

	lang.mixin(this, args);

    // Oh yeahhhh!!!!  Javascript is really rocking these days.
    // Now nobody can bugger about with us, defining new properties etc.
    Object.seal(this);

};

CustomerOrder.prototype.validate = function () {
	return new ObjectValidator().validate(this);
};

/**
 * Validation constraints for customer orders.
 * @type {Array}
 */
CustomerOrder.prototype.constraints = [
	{
		property: 'orderNumber',
		required: true
	},
	{
		property: 'customerReference',
		required: true
	}
];

/**
 * @function
 * @param {Object} item the item loaded from the persistent store.
 * @description hydrates an instance of CustomerOrder from persistent data.
 */
CustomerOrder.prototype.hydrate = function(item) {
    var self = this;
    [
		'orderNumber',
		'customerReference',
		'bookingDate'
	].forEach(function(propertyName) {
        self[propertyName] = item[propertyName];
    });

	this.id = item._id;
};

exports.CustomerOrder = CustomerOrder;