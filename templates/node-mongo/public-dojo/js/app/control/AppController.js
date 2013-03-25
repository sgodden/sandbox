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
        _currentController: null,

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
                router.go("/orders");
            }
        },

        _switchController: function(newController) {
            newController.region = "center";
            if (this._currentController) {
                this._appContainer.removeChild(this._currentController)
                this._currentController.destroy();
            }
            this._currentController = newController;
            put(newController.domNode, ".full-height");
            this._appContainer.addChild(this._currentController);
            this._currentController.startup();
        }
    }

});