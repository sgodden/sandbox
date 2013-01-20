var CustomerOrder = require('../model/CustomerOrder').CustomerOrder;

exports.CustomerOrderRepository = {

    findAll: function(callback) {

        conn.open(function(err, db) {
            var docs = [], customerOrder;
            db.collection(COLL_NAME).find().each(function(err, item){
                if (item) {
                    customerOrder = new CustomerOrder();
                    lang.mixin(customerOrder, item); // TODO - encapsulate the mixing in
                    docs.push(customerOrder);
                    customerOrder.logOrderNumber();
                }
                else {
                    // we get a null item when there are no more
                    /*
                     * res.send is a once-only operation which commits the response,
                     * so the pattern is to build up the response and res.send it only when finished.
                     */
                    conn.close();
                    d.resolve(docs);
                }
            });
        });

        return d;
    }

};
