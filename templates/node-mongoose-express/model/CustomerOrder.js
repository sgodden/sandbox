var mongoose = require('mongoose'),
    customerOrderSchema,
    CustomerOrder;

customerOrderSchema = mongoose.Schema({
    orderNumber: String,
    customerReference: String
});

customerOrderSchema.methods.logOrderNumber = function() {
    console.log('Order number: ' + this.orderNumber);
}

CustomerOrder = mongoose.model('CustomerOrder', customerOrderSchema);
exports.CustomerOrder = CustomerOrder;

