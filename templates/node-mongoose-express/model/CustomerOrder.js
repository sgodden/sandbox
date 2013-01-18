var oop = require('declare')({"repo": "repo"});

exports.CustomerOrder = oop.declare('model.CustomerOrder', [], {
    orderNumber: null,

    logOrderNumber: function() {
        console.log(this.orderNumber);
    }
});