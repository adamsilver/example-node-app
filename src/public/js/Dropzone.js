function Dropzone(container) {
	var dropzone = document.getElementById('dropzone');

	dropzone.ondragover = function(e) {
		e.preventDefault();
		$(dropzone).addClass('dropzone--dragOver');
	}

	dropzone.ondragleave = function(e) {
		$(dropzone).removeClass('dropzone--dragOver');
	}

	dropzone.ondrop = function(e) {
		e.preventDefault();
		console.log(e.dataTransfer.files);
		$(dropzone).removeClass('dropzone--dragOver');
	}

}



// var dropzone = ...;
// dropzone.ondragover...
// dropzone.ondragleave...
// dropzone.ondrop = function (e) {
// 	e.preventDefault();
// 	// remove dragover state too

// 	// upload
// 	e.dataTransfer.files
// };

// function upload(files) {
// 	var formData = new FormData();
// 	var xhr = new XMLHttpRequest();
// 	var i;
// 	for(i=0; i < files.length; i++) {
// 		formData.append('file[]', files[i]);
// 	}

// 	xhr.onload = function() {
// 		var data = this.responseText;

// 	};

// 	xhr.open('post', '/path/');
// 	xhr.send(formData);
// }