define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/CustomerOrderEditForm.html",
    "dojox/mvc/at",
	"dojo/on",

    "dijit/form/Form",
    "dijit/form/ValidationTextBox",
    "dijit/form/Button"
], function (declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin, template, at, on) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin], {
        model: null,

        templateString: template,
        dapForm: null,
        dapId: null,
        dapCustomerReference: null,
        dapOrderNumber: null,
		dapSubmitButton: null,

        postCreate: function() {
            this.inherited(arguments);
            this.dapId.value = this.model.id;
            this.dapCustomerReference.set("value", at(this.model, "customerReference"));
            this.dapOrderNumber.set("value", at(this.model, "orderNumber"));
			this.own(on(this.dapForm, "submit", lang.hitch(this, function() {
				// focus the button so that the mvc bindings are updated
				this.dapSubmitButton.focus();
			})));
        },

		startup: function() {
			this.inherited(arguments);
			this.dapOrderNumber.focus();
		}
    });
});