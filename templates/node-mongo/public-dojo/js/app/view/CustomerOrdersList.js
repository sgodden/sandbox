define([
    "dojo/_base/declare",
    "dgrid/OnDemandGrid",
    "dgrid/Selection",
    "put-selector/put"
], function (declare, OnDemandGrid, Selection, put) {
    return declare([OnDemandGrid], {
        selectionMode: "single",
        columns: {
            orderNumber: {
                label: "Order Number",
                renderCell: function(object, value, cell) {
                    put(cell, "a[href='#/order/" + object.id + "']", value);
                }
            },
            customerReference: "Customer Ref",
            bookingDate: "Booking Date"
        }
    });
});