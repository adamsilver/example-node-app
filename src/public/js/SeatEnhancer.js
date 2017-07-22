function SeatEnhancer() {
	var checkboxes = $('.plane-seat input');
	checkboxes.on('focus', $.proxy(this, 'onCheckboxFocus'));
	checkboxes.on('blur', $.proxy(this, 'onCheckboxBlur'));
	checkboxes.on('click', $.proxy(this, 'onCheckboxClick'));
}

SeatEnhancer.prototype.onCheckboxFocus = function(e) {
	$(e.target).parents('.plane-seat').addClass('plane-seat-isFocussed');
};

SeatEnhancer.prototype.onCheckboxBlur = function(e) {
	$(e.target).parents('.plane-seat').removeClass('plane-seat-isFocussed');
};

SeatEnhancer.prototype.onCheckboxClick = function(e) {
	var checkbox = $(e.target);
	if(checkbox[0].checked) {
		checkbox.parents('.plane-seat').addClass('plane-seat-isSelected');
	} else {
		checkbox.parents('.plane-seat').removeClass('plane-seat-isSelected');
	}
};