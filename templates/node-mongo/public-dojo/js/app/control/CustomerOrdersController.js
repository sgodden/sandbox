define([
    "dojo/_base/declare",
    "dijit/layout/ContentPane",
    "../view/CustomerOrdersListView",
    "../model/CustomerOrdersModel",
    "dojo/router"
], function (declare, ContentPane, CustomerOrdersListView, CustomerOrdersModel, router) {

    return declare([ContentPane], {
        _view: null,

        postCreate: function () {
            this.inherited(arguments);

            this._view = new CustomerOrdersListView({
                store: new CustomerOrdersModel()
            });

            this._view.on("create", function(){
                router.go("/order")
            });

            this.set("content", this._view);
        },

        startup: function () {
            this.inherited(arguments);
            this._view.startup();
        }
    });

});