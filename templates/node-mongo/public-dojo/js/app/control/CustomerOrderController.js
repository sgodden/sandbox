define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/router",
    "../model/CustomerOrdersModel",
    "../view/CustomerOrderEditForm",
	"dojo/Deferred"
], function (declare, lang, router, CustomerOrdersModel, CustomerOrderEditForm, Deferred) {

    return declare([], {

        id: "customerOrderEditForm",

        objectId: null,

        _model: null,

		constructor: function(args) {
			lang.mixin(this, args);
		},

        getView: function () {
			var d = new Deferred();

            if (this.objectId) {
                new CustomerOrdersModel().get(this.objectId).then(
					lang.hitch(this, function(order) {
						d.resolve(this._configureView(order));
					}),
					d.reject
				);
            } else {
				d.resolve(this._configureView({
					id: undefined,
					orderNumber: null,
					customerReference: null
				}));
            }

			return d.promise;
        },

        _configureView: function(order) {
			return new CustomerOrderEditForm({
				model: order,
				onsubmit: lang.hitch(this, "_submit"),
				ondelete: lang.hitch(this, "_delete")
			});
        },

		_delete: function(data) {
			this._postback(data.model, 'remove');
		},

        _submit: function(data) {
			var model = data.model, method = model.id ? "put" : "add";
			this._postback(model, method);
        },

		_postback: function(model, method) {
			var data = method === 'remove' ? model.id : model;
			model._csrf = dojo.cookie("_csrf");
			// TODO - handling of server side errors
			new CustomerOrdersModel()[method](data).then(
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