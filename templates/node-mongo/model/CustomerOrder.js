var somePrivateFunction, CustomerOrder;

/*
 * Private function declarations.
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

    Object.defineProperty(this, 'orderNumber', {
        get: function() {
            console.log('Returning order number');
            return orderNumber;
        },
        set: function(_orderNumber) {
            console.log('Setting order number');
            orderNumber = _orderNumber;
        }
    });

    // Oh yeahhhh!!!!  Javascript is really rocking these days.
    // Now nobody can bugger about with us, defining new properties etc.
    Object.seal(this);
};

/**
 * @method logOrderNumber.
 */
CustomerOrder.prototype.logOrderNumber = function() {
    somePrivateFunction(this.orderNumber);
};

exports.CustomerOrder = CustomerOrder;