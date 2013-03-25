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

    "dijit/form/Form",
    "dijit/form/ValidationTextBox",
    "dijit/form/Button",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane"
], function (declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin, template,
        CustomerOrdersList, html, on) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin], {
        store: null,

        templateString: template,
        dapListContainer: null,
        _list: null,

        postCreate: function() {
            this.inherited(arguments);
            this._list = new CustomerOrdersList();
            html.set(this.dapListContainer, this._list.domNode);
        },

        startup: function() {
            this.inherited(arguments);
            this._list.set("store", this.store);
            this._list.startup();
        },

        _newButtonClicked: function() {
            on.emit(this.domNode, "create", {
                bubbles: true,
                cancelable: true
            });
        }
    });
});