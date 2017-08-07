function Menu(container, options) {
	this.container = container;
	this.menu = this.container.find('.menu-items');
	this.setupOptions(options);
	this.setupKeys();
	this.menu.on('keydown', 'input', $.proxy(this, 'onButtonKeydown'));
	this.createToggleButton();
	this.setupResponsiveChecks();
}

Menu.prototype.setupOptions = function(options) {
	options = options || {};
	options.mq = options.mq || '(min-width: 40em)';
	this.options = options;
};

Menu.prototype.setupResponsiveChecks = function() {
	this.mq = window.matchMedia(this.options.mq);
	this.mq.addListener($.proxy(this, 'checkMode'));
	this.checkMode(this.mq);
};

Menu.prototype.createToggleButton = function() {
	this.menuButton = $('<button class="secondaryButton" type="button" aria-haspopup="true" aria-expanded="false">Actions<span aria-hidden="true">&#x25be;</span></button>');
	this.menuButton.on('click', $.proxy(this, 'onMenuButtonclick'));
};

Menu.prototype.checkMode = function(mq) {
	if(mq.matches) {
		this.enableBigMode();
	} else {
		this.enableSmallMode();
	}
};

Menu.prototype.enableSmallMode = function() {
	this.container.prepend(this.menuButton);
	this.hideMenu();
	this.menu[0].setAttribute('role', 'menu');
	this.setupTabIndex();
};

Menu.prototype.enableBigMode = function() {
	this.menuButton.detach();
	this.showMenu();
	this.menu[0].setAttribute('role', 'menubar');
	this.resetTabIndex();
};

Menu.prototype.hideMenu = function() {
	this.menu[0].hidden = true;
	this.menuButton[0].setAttribute('aria-expanded', 'false');
};

Menu.prototype.showMenu = function(first_argument) {
	this.menu[0].hidden = false;
	this.menuButton[0].setAttribute('aria-expanded', 'true');
};

Menu.prototype.onMenuButtonclick = function(e) {
	if(this.menu[0].hidden) {
		this.showMenu();
		this.menu.find('input')[0].focus();
	} else {
		this.hideMenu();
		this.menuButton.focus();
	}
};

Menu.prototype.setupKeys = function() {
	this.keys = {
		enter: 13,
		esc: 27,
		space: 32,
		left: 37,
		up: 38,
		right: 39,
		down: 40,
		tab: 9
   };
};

Menu.prototype.setupTabIndex = function() {
	this.container.find('input').each($.proxy(function(index, el) {
		el.tabIndex = -1;
	}, this));
};

Menu.prototype.resetTabIndex = function() {
	this.container.find('input').each($.proxy(function(index, el) {
		el.tabIndex = 0;
	}, this));
};

Menu.prototype.onButtonKeydown = function(e) {
	switch (e.keyCode) {
		case this.keys.right:
			e.preventDefault();
			this.focusNext(e.currentTarget);
			break;
		case this.keys.up:
			e.preventDefault();
			this.focusPrevious(e.currentTarget);
			break;
		case this.keys.down:
			e.preventDefault();
			this.focusNext(e.currentTarget);
			break;
		case this.keys.left:
			e.preventDefault();
			this.focusPrevious(e.currentTarget);
			break;

		case this.keys.esc:
			if(!this.mq.matches) {
				this.menuButton.focus();
				this.hideMenu();
			}
			break;
		case this.keys.tab:
			if(!this.mq.matches) {
				this.hideMenu();
			}
	}
};

Menu.prototype.focusNext = function(currentButton) {
	var next = $(currentButton).next();
	if(next[0]) {
		next.focus();
	} else {
		this.container.find('input').first().focus();
	}
};

Menu.prototype.focusPrevious = function(currentButton) {
	var prev = $(currentButton).prev();
	if(prev[0]) {
		prev.focus();
	} else {
		this.container.find('input').last().focus();
	}
};