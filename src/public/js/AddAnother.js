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
			$(el).append('<button class="addAnother-removeButton" type="button">- Remove</button>');
		}
	});
};

AddAnother.prototype.onAddButtonClick = function(e) {
	this.cloneItem();
	this.updateItems();
	this.focusLastItem();
};

AddAnother.prototype.cloneItem = function() {
	var items = this.container.find('.addAnother-item');
	var item = this.container.find('.addAnother-item')[0];
	var newItem = $(item).clone();
	this.appendRemoveButton(newItem);
	if(items.length === 1) {
		this.appendRemoveButton($(item));
	}
	this.container.find('.addAnother-items').append(newItem);
};

AddAnother.prototype.appendRemoveButton = function(item) {
	item.append('<button class="addAnother-removeButton" type="button">- Remove</button>');
};

AddAnother.prototype.updateItems = function() {
	this.container.find('.addAnother-item').each(function(index, el) {
		$(el).find('[data-name], [data-id]').each(function(index2, el) {
			// var idAttr = $(el).attr('data-name');
			$(el)[0].name = $(el).attr('data-name').replace(/%index%/, index);
			$(el)[0].id = $(el).attr('data-id').replace(/%index%/, index);

			var label = $(el).parents('label');
			if(label[0]) {
				label[0].htmlFor = $(el)[0].id;
				el.checked = false;
			} else {
				label = $(el).prev('label');
				label[0].htmlFor = $(el)[0].id;
				el.value = '';
			}
		});
	});
};

AddAnother.prototype.focusLastItem = function() {
	this.container.find('.addAnother-item:last .field:first').find('input, textarea, select').focus();
};

AddAnother.prototype.onRemoveButtonClick = function(e) {
	var items = this.container.find('.addAnother-item');
	$(e.currentTarget).parents('.addAnother-item').remove();
	if(items.length == 2) {
		items.find('.addAnother-removeButton').remove();
	}
	this.updateItems();
	this.focusLastItem();
};

AddAnother.prototype.createAddButton = function() {
	this.addButton = $('<button type="button" class="addAnother-addButton">+ Add another</button>');
	this.container.append(this.addButton);

	this.addButton.on('click', $.proxy(this, 'onAddButtonClick'));
};