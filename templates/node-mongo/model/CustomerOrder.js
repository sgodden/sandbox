var somePrivateFunction, CustomerOrder;

/**
 * @class CustomerOrder.
 * @constructor
 */
CustomerOrder = function() {
    /*
     * Private properties.
     */
	var id = null;
    var orderNumber = null;
    var customerReference = null;
	var bookingDate = new Date();

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

    // Oh yeahhhh!!!!  Javascript is really rocking these days.
    // Now nobody can bugger about with us, defining new properties etc.
    // TODO - this does not seem to have the effect I thought it would
    //Object.seal(this);
};

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