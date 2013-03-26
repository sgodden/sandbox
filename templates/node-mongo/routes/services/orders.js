var CustomerOrderRepository = require('../../repo/CustomerOrderRepository').CustomerOrderRepository,
	_ = require("underscore"),
    repo = new CustomerOrderRepository();

exports.list = function(req, res){

    var doList = function() {
        repo.findAll().then(function(docs){
            res.send(docs);
        });
    };

    repo.count().then(function(count){
        if (count === 0) {
            console.log('There are no orders - inserting some');
			var orders = [];
			_.times(10, function(idx){
				orders.push({
					id: idx,
					orderNumber: "O000000" + (idx + 1),
					customerReference: "CR0000" + (idx + 1),
					bookingDate: new Date()
				});
			});
            repo.insert(orders).then(doList);
        }
        else {
            doList();
        }
    });


};

exports.get = function(req, res) {
	var query = {
		id: new Number(req.params.id).valueOf()
	};
	repo.findOne(query).then(function(order) {
		res.send(order);
	});
};

exports.put = function(req, res) {
	console.log(req.body);
}