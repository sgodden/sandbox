var repo = require('../repo/repo'),
    CustomerOrderRepository = repo.CustomerOrderRepository;


/*
 * GET users listing.
 */

exports.list = function(req, res){

    var repo = new CustomerOrderRepository(),
        doList;

    doList = function() {
        repo.findAll().then(function(docs){
            res.render(
                'orders',
                {
                    title: 'Orders',
                    orders: docs
                }
            );
        });
    };

    repo.count().then(function(count){
        if (count === 0) {
            console.log('There are no orders - inserting one');
            repo.insert({
                orderNumber: "O000001",
                customerReference: "CR00001"
            }).then(doList);
        }
        else {
            doList();
        }
    });


};