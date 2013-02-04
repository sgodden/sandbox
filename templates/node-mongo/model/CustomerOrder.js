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
CustomerOrder = function(){
    this.orderNumber = null;
};

/**
 * @method logOrderNumber.
 */
CustomerOrder.prototype.logOrderNumber = function() {
    somePrivateFunction(this.orderNumber);
};

exports.CustomerOrder = CustomerOrder;