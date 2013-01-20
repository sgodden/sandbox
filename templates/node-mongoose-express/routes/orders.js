var CustomerOrder = require("../model/CustomerOrder").CustomerOrder;


/*
 * GET users listing.
 */

exports.list = function(req, res){

    CustomerOrder.find(function(err, orders){
        res.render('orders', {title: 'Orders', orders: orders});
    });

};