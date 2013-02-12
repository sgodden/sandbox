/*
 * GET users listing.
 */
exports.list = function(req, res){

    res.render(
        'orders',
        {
            title: 'Orders'
        }
    );

};