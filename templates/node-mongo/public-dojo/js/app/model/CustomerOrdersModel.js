define([
    "dojo/_base/declare",
    "dojo/store/JsonRest"
], function (declare, JsonRest) {
    return declare([JsonRest], {
        idPoperty: "id",
        target: "/services/orders/"
    });
});