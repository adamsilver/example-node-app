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
  	var formData = new FormData();
  	var xhr = new XMLHttpRequest();
  	for(var i=0; i < files.length; i++) {
  		formData.append('file[]', files[i]);
      $('.files').append('<p>'+ files[i].name +'</p>');
    }
  	this.makeRequest(formData);
  };

  Dropzone.prototype.onFileChange = function(e) {
    var files = e.currentTarget.files;
    for(var i=0; i < files.length; i++) {
      $('.files').append('<p>'+ files[i].name +'</p>');
    }
  };

  Dropzone.prototype.makeRequest = function(formData) {
  	$.ajax({
        url: '/upload',
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
              console.log(percentComplete);

              // update the Bootstrap progress bar with the new percentage
              // $('.progress-bar').text(percentComplete + '%');
              // $('.progress-bar').width(percentComplete + '%');

              // once the upload reaches 100%, set the progress bar text to done
              // if (percentComplete === 100) {
              //   $('.progress-bar').html('Done');
              // }

            }

          }, false);

          return xhr;
        }
      });
  };
}