var oop = require('declare')({"repo": "repo"});

exports.CustomerOrderRepository = oop.declare('repo.CustomerOrder', [], {
    sayHello: function() {
        console.log('Hello!');
    }
});
