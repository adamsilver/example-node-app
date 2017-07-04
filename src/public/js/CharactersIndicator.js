function CharactersIndicator(field, options) {
	this.field = $(field);
	this.options = {
		maxLength: 100,
		message: 'You have %count% characters remaining.',
		status: $('<div class="indicator" role="alert" aria-live="polite" />')
	};
	this.options = $.extend(this.options, options);
	this.updateStatus(this.options.maxLength);
	this.field.parent().append(this.options.status);
	this.field.on("keydown", $.proxy(this, 'onFieldChange'));
};

CharactersIndicator.prototype.onFieldChange = function(e) {
	var remaining = this.options.maxLength - this.field.val().length;
	this.updateStatus(remaining);
};

CharactersIndicator.prototype.updateStatus = function(remaining) {
	var message = this.options.message.replace(/%count%/, remaining);
	this.options.status.html(message);
};