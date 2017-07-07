function CheckboxCollapser(checkbox, element) {
	this.checkbox = checkbox;
	this.element = element;
	this.check();
	$(this.checkbox).on('click', $.proxy(this, 'onCheckboxClick'));
};

CheckboxCollapser.prototype.onCheckboxClick = function(e) {
	this.check();
};

CheckboxCollapser.prototype.check = function() {
	if(this.checkbox.checked) {
		$(this.element).hide();
	} else {
		$(this.element).show();
	}
};