define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/CustomerOrderEditForm.html",
    "dojox/mvc/at",
	"dojo/on",
	"dojo/_base/event",
	"dojo/Evented",

    "dijit/form/Form",
    "dijit/form/ValidationTextBox",
    "dijit/form/DateTextBox",
    "dijit/form/Button",
	"dijit/form/FilteringSelect"
], function (declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin, template, at, on, event, Evented) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin], {
        model: null,

        templateString: template,
        dapForm: null,
        dapId: null,
        dapCustomerReference: null,
        dapOrderNumber: null,
        dapBookingDate: null,
		dapSubmitButton: null,

        postCreate: function() {
            this.inherited(arguments);
            this.dapId.value = this.model.id;
            this.dapCustomerReference.set("value", at(this.model, "customerReference"));
            this.dapOrderNumber.set("value", at(this.model, "orderNumber"));
            this.dapBookingDate.set("value", at(this.model, "bookingDate"));
			this.own(on(this.dapForm, "submit", lang.hitch(this, function(evt) {
				event.stop(evt);
				// focus the button so that the mvc bindings are updated
				this.dapSubmitButton.focus();
				this.emit('submit', { model: this.model });
			})));
        },

		_deleteButtonClicked: function() {
			this.emit('delete', { model: this.model });
		},

		startup: function() {
			this.inherited(arguments);
			this.dapOrderNumber.focus();
		}
    });
});