var somePrivateFunction, CustomerOrder;

/*
 * Functions that are private to the module.
 */
somePrivateFunction = function(orderNumber) {
    console.log("I am private: " + orderNumber);
};

/**
 * @class CustomerOrder.
 * @constructor
 */
CustomerOrder = function() {
    /*
     * Private properties.
     */
    var orderNumber = null;
    var customerReference = null;

    Object.defineProperty(this, 'orderNumber', {
        enumerable: true,
        get: function() {
            console.log('Returning order number');
            return orderNumber;
        },
        set: function(_orderNumber) {
            console.log('Setting order number');
            orderNumber = _orderNumber;
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

    // Oh yeahhhh!!!!  Javascript is really rocking these days.
    // Now nobody can bugger about with us, defining new properties etc.
    // TODO - this does not seem to have the effect I thought it would
    Object.seal(this);
};

/**
 * @method logOrderNumber.
 */
CustomerOrder.prototype.logOrderNumber = function() {
    somePrivateFunction(this.orderNumber);
};

CustomerOrder.prototype.hydrate = function(item) {
    var self = this;
    ['orderNumber', 'customerReference'].forEach(function(propertyName) {
        self[propertyName] = item[propertyName];
    });
};

exports.CustomerOrder = CustomerOrder;