define([
    "dojo/router",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/hash",
    "dijit/registry",
    "put-selector/put",
    "./CustomerOrdersController",
    "./CustomerOrderController"
], function (router, lang, dom, hash, registry, put, CustomerOrdersController, CustomerOrderController) {

    return {
        _appContainer: null,
        _currentView: null,

        start: function() {
            this._appContainer = registry.byId("appContainer");

            router.register("/orders", lang.hitch(this, function(){
                this._switchController(new CustomerOrdersController());
            }));

            router.register("/order", lang.hitch(this, function(){
                this._switchController(new CustomerOrderController());
            }));

            router.register("/order/:id", lang.hitch(this, function(evt){
                this._switchController(new CustomerOrderController({
                    objectId: evt.params.id
                }));
            }));

            router.startup();

            if (!hash()) {
				setTimeout(function() {
                	router.go("/orders");
				});
            }
        },

        _switchController: function(newController) {
            newController.getView().then(lang.hitch(this, function(view) {
				view.region = 'center';
				if (this._currentView) {
					this._appContainer.removeChild(this._currentView);
					this._currentView.destroy();
				}
				this._currentView = view;
				this._appContainer.addChild(this._currentView);
				this._currentView.startup();
			}));
        }
    }

});