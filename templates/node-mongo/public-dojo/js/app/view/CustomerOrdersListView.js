define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/CustomerOrdersListView.html",
    "app/view/CustomerOrdersList",
    "dojo/html",
    "dojo/on",
	"dijit/layout/_ContentPaneResizeMixin",

    "dijit/form/Button",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane"
], function (declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin, template,
        CustomerOrdersList, html, on, _ContentPaneResizeMixin) {

    return declare("app.view.CustomerOrdersListView", [_WidgetBase, _ContentPaneResizeMixin, _TemplatedMixin, _WidgetsInTemplatedMixin], {
        store: null,

        templateString: template,
        dapListContainer: null,
        _list: null,

		class: 'customer-order-list-view',

        postCreate: function() {
			this.containerNode = this.domNode;
            this.inherited(arguments);
            this._list = new CustomerOrdersList({}, this.dapListContainer);
        },

        startup: function() {
            this.inherited(arguments);
            this._list.set("store", this.store);
            this._list.startup();
			// this absolutely should not be necessary
			setTimeout(lang.hitch(this._list, 'resize'));
        },

        _newButtonClicked: function() {
            on.emit(this.domNode, "create", {
                bubbles: true,
                cancelable: true
            });
        }
    });
});