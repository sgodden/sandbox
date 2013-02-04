var somePrivateFunction, CustomerOrder;

somePrivateFunction = function(orderNumber) {
    console.log("I am private: " + orderNumber);
};

CustomerOrder = function(){
    this.orderNumber = null;
};

CustomerOrder.prototype.logOrderNumber = function() {
    somePrivateFunction(this.orderNumber);
};

exports.CustomerOrder = CustomerOrder;