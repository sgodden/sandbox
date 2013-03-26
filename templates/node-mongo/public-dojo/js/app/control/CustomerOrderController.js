define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/router",
    "dijit/layout/ContentPane",
    "../model/CustomerOrdersModel",
    "../view/CustomerOrderEditForm"
], function (declare, lang, router, ContentPane, CustomerOrdersModel, CustomerOrderEditForm) {

    return declare([ContentPane], {

        id: "customerOrderEditForm",

        objectId: null,

        _model: null,

        postCreate: function () {
            this.inherited(arguments);
            if (this.objectId) {
                new CustomerOrdersModel().get(this.objectId).then(lang.hitch(this, "_configureView"));
            } else {
                this._configureView({
                    id: undefined,
                    orderNumber: null,
                    customerReference: null
                });
            }
        },

        _configureView: function(order) {
            var view = new CustomerOrderEditForm({model: order});
            this._model = order;
            view.on("submit", lang.hitch(this, "_submit"));
            this.set("content", view);
        },

        _submit: function(e) {
			var method = this._model.id ? "put" : "add";
            e.preventDefault();
            // TODO - handling of server side errors
            new CustomerOrdersModel()[method](this._model).then(
                function(){
                    router.go("/orders");
                },
                function(response) {
                    console.log("ERROR: " + JSON.parse(response.response.data).exceptions[0].message);
                }
            );
        }
    });

});