define([
    "dojo/_base/declare",
    "../view/CustomerOrdersListView",
    "../model/CustomerOrdersModel",
    "dojo/router",
	"dojo/Deferred"
], function (declare, CustomerOrdersListView, CustomerOrdersModel, router, Deferred) {

    return declare("app.control.CustomerOrdersController", [], {

        getView: function () {
            var view = new CustomerOrdersListView({
                store: new CustomerOrdersModel()
            });

            view.on("create", function(){
                router.go("/order")
            });

			return new Deferred().resolve(view);
        }

    });

});