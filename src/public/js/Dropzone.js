var isAdvancedUpload = function() {
  var div = document.createElement( 'div' );
  return ( ( 'draggable' in div ) || ( 'ondragstart' in div && 'ondrop' in div ) ) && 'FormData' in window && 'FileReader' in window;
}();

if(isAdvancedUpload) {
  function Dropzone(container) {
  	this.dropzone = container;
    this.dropzone.addClass('dropzone--enhanced');
    this.dropzone.find('label span').text('Attach a file or drag and drop');

  	this.dropzone.on('dragover', $.proxy(this, 'onDragOver'));
  	this.dropzone.on('dragleave', $.proxy(this, 'onDragLeave'));
  	this.dropzone.on('drop', $.proxy(this, 'onDrop'));

    this.fileInput = this.dropzone.find('.field-file');
    this.fileInput.on('change', $.proxy(this, 'onFileChange'));
    this.fileInput.on('focus', $.proxy(this, 'onFileFocus'));
    this.fileInput.on('blur', $.proxy(this, 'onFileBlur'));
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
  	this.dropzone.removeClass('dropzone--dragOver');
  };

  Dropzone.prototype.upload = function(files) {
    for(var i = 0; i < files.length; i++) {
      var formData = new FormData();
      formData.append('documents', files[i]);
      this.makeRequest(formData);
    }
    $('.files').removeClass('hidden');
  };

  Dropzone.prototype.onFileChange = function(e) {
    this.upload(e.currentTarget.files);
  };

  Dropzone.prototype.onFileFocus = function(e) {
    this.dropzone.find('label').addClass('focus');
  };

  Dropzone.prototype.onFileBlur = function(e) {
    this.dropzone.find('label').removeClass('focus');
  };

  Dropzone.prototype.makeRequest = function(formData) {
    var li = $('<li>'+ formData.get('documents').name +'<br><progress value="0" max="100">0%</progress></li>');
    $('.files').append(li);

    // use closure
  	$.ajax({
        url: '/ajax-upload',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        error: function() {
        	console.log(arguments);
        },
        success: function(data){
            console.log('Upload successful!\n' + data);
        },
        xhr: function() {
          var xhr = new XMLHttpRequest();

          xhr.upload.addEventListener('progress', function(evt) {
            if (evt.lengthComputable) {
              // calculate the percentage of upload completed
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);

              li.find('progress').text(percentComplete + '%');
              li.find('progress')[0].value = percentComplete;
            }

          }, false);

          return xhr;
        }
      });
  };
}
