//France (1 of 2) is selected
function Autocomplete(control) {
	this.control = control;
	this.controlId = control.id;
	this.container = $(control).parent();
	this.wrapper = $('<div class="autocomplete"></div>');
	this.container.append(this.wrapper);
	this.createTextBox();
	this.createButton();
	this.createOptionsUl();
	this.removeSelectBox();
	this.createStatusBox();
	this.setupKeys();
	$(document).on('click', $.proxy(this, 'onDocumentClick'));
};

Autocomplete.prototype.onDocumentClick = function(e) {
	if(!$.contains(this.container[0], e.target)) {
        this.hideOptions();
    }
};

Autocomplete.prototype.setupKeys = function() {
	this.keys = {
		enter: 13,
		esc: 27,
		space: 32,
		up: 38,
		down: 40,
		tab: 9
   };
};

Autocomplete.prototype.addTextBoxEvents = function() {
	this.textBox.on('click', $.proxy(this, 'onTextBoxClick'));
	this.textBox.on('keyup', $.proxy(this, 'onTextBoxKeyUp'));
	this.textBox.on('keydown', $.proxy(function(e) {
		switch (e.keyCode) {
			// this ensures that when users tabs away
			// from textbox that the normal tab sequence
			// is adhered to. We hide the options, which
			// removes the ability to focus the options
			case this.keys.tab:
				this.hideOptions();
				break;
		}
	}, this));
};

Autocomplete.prototype.onTextBoxClick = function(e) {
	this.clearOptions();
	var options = this.getAllOptions();
	this.buildOptions(options);
	this.updateStatus(options.length);
	this.showOptionsPanel();
};

Autocomplete.prototype.addSuggestionEvents = function() {
	this.optionsUl.on('click', '.autocomplete-option', $.proxy(this, 'onSuggestionClick'));
	this.optionsUl.on('keydown', $.proxy(this, 'onSuggestionsKeyDown'));
};

Autocomplete.prototype.onTextBoxKeyUp = function(e) {
	switch (e.keyCode) {
		case this.keys.esc:
			// we ignore when users presses escape
			break;
		case this.keys.up:
			// we ignore when the user presses up when on textbox
			break;
		case this.keys.down:
			// we want to handle this one
			this.onTextBoxDownPressed(e);
			break;
		case this.keys.tab:
			this.hideOptions();
			break;
		case this.keys.space:
			// ignore this because otherwise the
			// the menu will show again.
			break;
		case this.keys.enter:
			// we ignore when the user presses enter here,
			// otherwise the menu will show briefly before
			// submission completes
			break;
		default:
			// show suggestion
			this.onTextBoxType(e);
	}
};

Autocomplete.prototype.onSuggestionsKeyDown = function(e) {
	switch (e.keyCode) {
		case this.keys.up:
			// want to highlight previous option
			this.onSuggestionUpArrow(e);
			break;
		case this.keys.down:
			// want to highlight next suggestion
			this.onSuggestionDownArrow(e);
			break;
		case this.keys.enter:
			// want to select the suggestion
			this.onSuggestionEnter(e);
			break;
		case this.keys.space:
			// want to select the suggestion
			this.onSuggestionSpace(e);
			break;
		case this.keys.esc:
			// want to hide options
			this.onSuggestionEscape(e);
			break;
		case this.keys.tab:
			this.hideOptions();
			break;
		default:
			this.textBox.focus();
	}
};

Autocomplete.prototype.onTextBoxType = function(e) {
	if(this.textBox.val().trim().length > 0) {
		var options = this.getOptions(this.textBox.val().trim().toLowerCase());
		if(options.length > 0) {
			this.buildOptions(options);
			this.showOptionsPanel();
		} else {
			this.buildNoResultsMenu();
			this.showOptionsPanel();
			// this.hideOptions();
			// this.clearOptions();
		}
		this.updateStatus(options.length);
	}
};

Autocomplete.prototype.onSuggestionEscape = function(e) {
	this.clearOptions();
	this.hideOptions();
	this.focusTextBox();
};

Autocomplete.prototype.isShowingMenu = function() {
	return this.textBox.attr('aria-expanded', 'true');
};

Autocomplete.prototype.focusTextBox = function() {
	this.textBox.focus();
};

Autocomplete.prototype.onSuggestionClick = function(e) {
	this.textBox.val($(e.currentTarget).text());
	this.hideOptions();
	this.focusTextBox();
};

Autocomplete.prototype.onSuggestionEnter = function(e) {
	if(this.isOptionSelected()) {
		this.selectOption();
	}
	e.preventDefault();
};

Autocomplete.prototype.onSuggestionSpace = function(e) {
	if(this.isOptionSelected()) {
		this.selectOption();
		e.preventDefault();
	}
};

Autocomplete.prototype.selectOption = function() {
	this.textBox.val(this.getActiveOption().text());
	this.focusTextBox();
	this.hideOptions();
};

Autocomplete.prototype.onTextBoxDownPressed = function(e) {
	var option;
	var options;
	// No chars typed
	if(this.textBox.val().trim().length === 0) {
		options = this.getAllOptions();
		this.buildOptions(options);
		this.showOptionsPanel();
		option = this.getFirstOption();
		if(option[0]) {
			this.highlightOption(option);
		}
	// Chars typed
	} else {
		options = this.getOptions(this.textBox.val().trim());
		if(options.length > 0) {
			this.buildOptions(options);
			this.showOptionsPanel();
			option = this.getFirstOption();
			if(option[0]) {
				this.highlightOption(option);
			}
		}
	}
};

Autocomplete.prototype.onSuggestionDownArrow = function(e) {
	var option = this.getNextOption();
	if(option[0]) {
		this.highlightOption(option);
	}
	e.preventDefault();
};

Autocomplete.prototype.onSuggestionUpArrow = function(e) {
	if(this.isOptionSelected()) {
		option = this.getPreviousOption();
		if(option[0]) {
			this.highlightOption(option);

		} else {
			this.focusTextBox();
			this.hideOptions();
		}
	}
	e.preventDefault();
};

Autocomplete.prototype.isFirstOptionSelected = function() {
	var selectedOption = this.getActiveOption();
};

Autocomplete.prototype.isOptionSelected = function() {
	return this.activeOptionId;
};

Autocomplete.prototype.getActiveOption = function() {
	return $('#'+this.activeOptionId);
};

Autocomplete.prototype.getFirstOption = function() {
	return this.optionsUl.find('li').first();
};

Autocomplete.prototype.getPreviousOption = function() {
	return $('#'+this.activeOptionId).prev();
};

Autocomplete.prototype.getNextOption = function() {
	return $('#'+this.activeOptionId).next();
};

Autocomplete.prototype.highlightOption = function(option) {
	if(this.activeOptionId) {
		var activeOption = this.getOptionById(this.activeOptionId);
		activeOption.removeClass('autocomplete-option-isActive');
		activeOption.attr('aria-selected', 'false');
	}

	option.addClass('autocomplete-option-isActive');
	option.attr('aria-selected', 'true');

	if(!this.isElementVisible(option.parent(), option)) {
		option.parent().scrollTop(option.parent().scrollTop() + option.position().top);
	}

	this.activeOptionId = option[0].id;
	option.focus();
};

Autocomplete.prototype.getOptionById = function(id) {
	return $('#'+id);
};

Autocomplete.prototype.showOptionsPanel = function() {
	this.optionsUl.removeClass('autocomplete-options-isHidden');
	this.optionsUl.attr('aria-hidden', 'false');
	this.textBox.attr('aria-expanded', 'true');
	this.textBox.attr('tabindex', '0');
};

Autocomplete.prototype.hideOptions = function() {
	this.optionsUl.addClass('autocomplete-options-isHidden');
	this.optionsUl.attr('aria-hidden', 'true');
	this.textBox.attr('aria-expanded', 'false');
	this.activeOptionId = null;
	this.clearOptions();
	this.textBox.removeAttr('tabindex', '-1');
};

Autocomplete.prototype.clearOptions = function() {
	this.optionsUl.empty();
};

Autocomplete.prototype.getOptions = function(value) {
	var options = [];
	var selectOptions = this.control.options;
	var text;
	for(var i = 0; i < selectOptions.length; i++) {
		text = $(selectOptions[i]).text();
		if(text.toLowerCase().indexOf(value.toLowerCase()) > -1) {
			options.push(text);
		}
	}
	return options;
};

Autocomplete.prototype.getAllOptions = function() {
	var options = [];
	var selectOptions = this.control.options;
	var text;
	for(var i = 0; i < selectOptions.length; i++) {
		options.push($(selectOptions[i]).text());
	}
	return options;
};

Autocomplete.prototype.buildOptions = function(options) {
	this.clearOptions();
	this.activeOptionId = null;
	for(var i = 0; i < options.length; i++) {
		this.optionsUl.append(this.getOptionHtml(i, options[i]));
	}
	this.optionsUl.scrollTop(this.optionsUl.scrollTop());
};

Autocomplete.prototype.buildNoResultsMenu = function() {
	this.clearOptions();
	this.activeOptionId = null;
	this.optionsUl.append(this.getNoResultsOptionHtml());
	this.optionsUl.scrollTop(this.optionsUl.scrollTop());
};

Autocomplete.prototype.buildAllOptions = function() {
	this.clearOptions();
	this.activeOptionId = null;
	var options = this.control.options;
	for(var i = 0; i < options.length; i++) {
		this.optionsUl.append(this.getOptionHtml(i, $(options[i]).text()));
	}
};

Autocomplete.prototype.getNoResultsOptionHtml = function() {
	return '<li class="autocomplete-optionNoResults" role="option">' + 'No results' + '</li>';
};

Autocomplete.prototype.getOptionHtml = function(i, text) {
	return '<li tabindex="-1" class="autocomplete-option" aria-selected="false" role="option" id="autocomplete-option--' + i + '">' + text + '</li>';
};

Autocomplete.prototype.createStatusBox = function() {
	this.status = $('<div aria-live="polite" role="status" aria-atomic="true" class="autocomplete-status" />');
	this.wrapper.append(this.status);
};

Autocomplete.prototype.updateStatus = function(resultCount) {
	if(resultCount === 0) {
		this.status.text('No results.');
	} else {
		this.status.text(resultCount + ' results available.');
	}
	// window.setTimeout($.proxy(function() {
	// 	this.status.text('');
	// }, this), 1000);
};

Autocomplete.prototype.removeSelectBox = function() {
	$(this.control).remove();
};

Autocomplete.prototype.createTextBox = function() {
	this.textBox = $('<input autocapitalize="none" class="autocomplete-textBox" type="text" autocomplete="off">');

	this.textBox.attr('aria-owns', this.getOptionsId());
	this.textBox.attr('aria-autocomplete', 'list');
	this.textBox.attr('role', 'combobox');

	this.textBox.prop('id', this.controlId);
	this.wrapper.append(this.textBox);
	this.addTextBoxEvents();
};

Autocomplete.prototype.getOptionsId = function() {
	return 'autocomplete-options--'+this.controlId;
};

Autocomplete.prototype.createButton = function() {
	// this.button = $('<button class="autocomplete-button" type="button" tabindex="-1"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="autocomplete-downArrow"><g stroke="none" fill="none" fill-rule="evenodd"><polygon fill="#000000" points="0 0 22 0 11 17"></polygon></g></svg></button>');
	// this.wrapper.append(this.button);
	// this.button.on('click', $.proxy(this, 'onButtonClick'));

	var arrow = $('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="autocomplete-downArrow"><g stroke="none" fill="none" fill-rule="evenodd"><polygon fill="#000000" points="0 0 22 0 11 17"></polygon></g></svg>');
	this.wrapper.append(arrow);
	arrow.on('click', $.proxy(this, 'onArrowClick'));
};

Autocomplete.prototype.onButtonClick = function(e) {
	this.clearOptions();
	var options = this.getAllOptions();
	this.buildOptions(options);
	this.updateStatus(options.length);
	this.showOptionsPanel();
	this.textBox.focus();
};

Autocomplete.prototype.onArrowClick = function(e) {
	this.clearOptions();
	var options = this.getAllOptions();
	this.buildOptions(options);
	this.updateStatus(options.length);
	this.showOptionsPanel();
	this.textBox.focus();
};

Autocomplete.prototype.createOptionsUl = function() {
	this.optionsUl = $('<ul id="'+this.getOptionsId()+'" role="listbox" class="autocomplete-options autocomplete-options-isHidden" aria-hidden="true"></ul>');
	this.wrapper.append(this.optionsUl);
	this.addSuggestionEvents();
};

Autocomplete.prototype.isElementVisible = function(container, element) {
	var containerHeight = $(container).height();
	var elementTop = $(element).offset().top;
	var containerTop = $(container).offset().top;
	var elementPaddingTop = parseInt($(element).css('padding-top'), 10);
	var elementPaddingBottom = parseInt($(element).css('padding-bottom'), 10);
	var elementHeight = $(element).height() + elementPaddingTop + elementPaddingBottom;
    var visible;

    if ((elementTop - containerTop < 0) || (elementTop - containerTop + elementHeight > containerHeight)) {
		visible = false;
    } else {
		visible = true;
    }
    return visible;
};