function CharactersIndicator(field, options) {
	this.field = $(field);
	this.status = $('<div class="indicator" role="alert" aria-live="polite" />');
	this.setOptions(options);
	this.updateStatus(this.options.maxLength);
	this.field.parent().append(this.status);
	this.field.on("keydown", $.proxy(this, 'onFieldChange'));
};

CharactersIndicator.prototype.setOptions = function(options) {
	this.options = {
		maxLength: 100,
		message: 'You have %count% characters remaining.',
	};
	this.options = $.extend(this.options, options);
};

CharactersIndicator.prototype.onFieldChange = function(e) {
	var remaining = this.options.maxLength - this.field.val().length;
	this.updateStatus(remaining);
};

CharactersIndicator.prototype.updateStatus = function(remaining) {
	var message = this.options.message.replace(/%count%/, remaining);
	this.status.html(message);
};