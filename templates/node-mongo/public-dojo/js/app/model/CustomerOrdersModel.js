define([
    "dojo/_base/declare",
    "dojo/store/JsonRest"
], function (declare, JsonRest) {
    return declare([JsonRest], {
        idProperty: "id",
        target: "/services/orders/"
    });
});