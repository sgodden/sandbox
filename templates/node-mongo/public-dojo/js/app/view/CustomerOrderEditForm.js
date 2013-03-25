define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/CustomerOrderEditForm.html",
    "dojox/mvc/at",

    "dijit/form/Form",
    "dijit/form/ValidationTextBox",
    "dijit/form/Button"
], function (declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin, template, at) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin], {
        model: null,

        templateString: template,
        dapForm: null,
        dapId: null,
        dapCustomerReference: null,
        dapOrderNumber: null,

        postCreate: function() {
            this.inherited(arguments);
            this.dapId.set("value", at(this.model, "id"))
            this.dapCustomerReference.set("value", at(this.model, "customerReference"))
            this.dapOrderNumber.set("value", at(this.model, "orderNumber"))
        }
    });
});