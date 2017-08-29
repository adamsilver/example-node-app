function AddAnother(container) {
	this.container = $(container);
	this.container.on('click', '.addAnother-removeButton', $.proxy(this, 'onRemoveButtonClick'));
	this.addRemoveButtons();
	this.createAddButton();
}

AddAnother.prototype.addRemoveButtons = function(e) {
	var items = this.container.find('.addAnother-item');
	items.each(function(i, el) {
		if(i != 0) {
			$(el).append('<button class="addAnother-removeButton" type="button"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 32 32"> <title>plus</title> <path fill="none" d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"></path> </svg> Remove</button>');
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
		newItem.append('<button class="addAnother-removeButton" type="button"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 32 32"> <title>plus</title> <path fill="none" d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"></path> </svg> Remove </button>');
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

AddAnother.prototype.createAddButton = function() {
	this.addButton = $('<button type="button" class="addAnother-addButton">Add another</button>');
	this.container.append(this.addButton);

	this.addButton.on('click', $.proxy(this, 'buttonOnClick'));
};