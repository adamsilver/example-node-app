function Dropzone(container) {
	this.dropzone = container;
	this.dropzone.on('dragover', $.proxy(this, 'onDragOver'));
	this.dropzone.on('dragleave', $.proxy(this, 'onDragLeave'));
	this.dropzone.on('drop', $.proxy(this, 'onDrop'));
}

Dropzone.prototype.onDragOver = function(e) {
	e.preventDefault();
	this.dropzone.addClass('dropzone--dragOver');
};

Dropzone.prototype.onDragLeave = function() {
	this.removeHighlight();
};

Dropzone.prototype.onDrop = function(e) {
	e.preventDefault();
	this.removeHighlight();
	this.upload(e.originalEvent.dataTransfer.files);
};

Dropzone.prototype.removeHighlight = function() {
	$(dropzone).removeClass('dropzone--dragOver');
};

Dropzone.prototype.upload = function(files) {
	var formData = new FormData();
	var xhr = new XMLHttpRequest();
	for(var i=0; i < files.length; i++) {
		formData.append('file[]', files[i]);
	}

	console.log(formData);

	xhr.onload = function() {
		var data = this.responseText;
		console.log(data);
	};
	xhr.open('post', '/path/');
	xhr.send(formData);
};