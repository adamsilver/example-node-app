function AddAnother(container) {
	this.container = $(container);
	this.button = this.container.find('button');
	this.button.on('click', $.proxy(this, 'buttonOnClick'));
	this.container.on('click', '.addAnother-removeButton', $.proxy(this, 'onRemoveButtonClick'));
	this.addRemoveButtons();
}

AddAnother.prototype.addRemoveButtons = function(e) {
	var items = this.container.find('.addAnother-item');
	items.each(function(i, el) {
		if(i != 0) {
			$(el).append('<button class="addAnother-removeButton" type="button">Remove</button>');
		}
	});
};

AddAnother.prototype.buttonOnClick = function(e) {
	var items = this.container.find('.addAnother-item');
	var lastItem = items.last();
	var newItem = lastItem.clone();
	var index = items.length;
	var name = newItem.find('input')[0].name;
	if(items.length == 1) {
		newItem.append('<button class="addAnother-removeButton" type="button">Remove</button>');
	}

	newItem.find('label')[0].htmlFor = name+(index+1);
	newItem.find('input')[0].id = name+(index+1);
	this.container.find('.addAnother-items').append(newItem);
};

AddAnother.prototype.onRemoveButtonClick = function(e) {
	var items = this.container.find('.addAnother-item');
	if(items.length > 1) {
		$(e.currentTarget).parents('.addAnother-item').remove();
	}
	if(items.length == 1) {
		items.find('.addAnother-removeButton').remove();
	}
};