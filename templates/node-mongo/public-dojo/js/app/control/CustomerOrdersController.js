define([
    "dojo/_base/declare",
    "dijit/layout/ContentPane",
    "../view/CustomerOrdersListView",
    "../model/CustomerOrdersModel",
    "dojo/router"
], function (declare, ContentPane, CustomerOrdersListView, CustomerOrdersModel, router) {

    return declare("app.control.CustomerOrdersController", [ContentPane], {

        _view: null,

		class: 'controller',

        postCreate: function () {
            this.inherited(arguments);
			this.containerNode = this.domNode;

            this._view = new CustomerOrdersListView({
                store: new CustomerOrdersModel()
            });

            this._view.on("create", function(){
                router.go("/order")
            });

            this.set("content", this._view);
        },

		resize: function() {
			this.inherited(arguments);
		},

        startup: function () {
            this.inherited(arguments);
            this._view.startup();
        }
    });

});