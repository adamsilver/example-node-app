const multer = require( 'multer' );
const bodyParser = require('body-parser');

const upload = multer( {
	dest: './tmp-uploads',
	// limits: '1mb',
	// fileFilter: function( req, file, cb ){

	// 	let ok = false;

	// 	if( file.mimetype === 'image/jpeg' ){
	// 		ok = true;
	// 	}

	// 	cb( null, ok );
	// }
} );

const urlBodyParser = bodyParser.urlencoded({ extended: true, limit: '1mb' });
const jsonBodyParser = bodyParser.json();
const defaultBodyParser = bodyParser();

module.exports = function( express, app ){

	app.get('/contents', function( req, res ){
		res.render('index.html');
	});

	app.get( '/components/action-menu', function( req, res ){
		res.render('components/menus/action-menu.html');
	});

	app.get( '/components/buttons/primary-button', function( req, res ){
		res.render('components/buttons/primary-button.html');
	});

	app.get( '/components/colours', function( req, res ){
		res.render('components/colour/colours.html');
	});

	app.get('/components/validation', function( req, res ){
		res.render('components/forms/validation.html');
	});

	app.get('/components/upload-form', function( req, res ){
		res.render('components/forms/upload-form.html');
	});


	app.post('/components/upload-form', upload.array( 'documents', 10 ), function( req, res ){
		console.log(req.files);
		res.render( 'components/forms/upload-form.html', { files: req.files } );
	} );

	app.post('/ajax-upload', upload.array( 'documents', 10 ), function( req, res ){
		console.log(req.files);

		res.json({ files: req.files });

	} );

	app.get('/components/text-box', function( req, res ){
		res.render('components/form-elements/text-box.html');
	});

	app.get('/components/file-input', function( req, res ){
		res.render('components/form-elements/file-input.html');
	});

	app.get('/components/select-box', function( req, res ){
		res.render('components/form-elements/select-box.html');
	});

	app.get('/components/search-box', function( req, res ){
		res.render('components/form-elements/search-box.html');
	});

	app.get('/components/textarea', function( req, res ){
		res.render('components/form-elements/textarea.html');
	});

	app.get('/components/radio-buttons', function( req, res ){
		res.render('components/form-elements/radio-buttons.html');
	});

	app.get('/components/checkbox-group', function( req, res ){
		res.render('components/form-elements/checkbox-group.html');
	});

	app.get('/components/memorable-date', function( req, res ){
		res.render('components/form-elements/memorable-date-field.html');
	});

	app.get('/components/date-picker', function( req, res ){
		res.render('components/form-elements/date-picker-field.html');
	});

	app.get('/components/autocomplete', function( req, res ){
		res.render('components/form-elements/autocomplete.html');
	});

	app.get('/components/characters-remaining', function( req, res ){
		res.render('components/form-elements/characters-remaining.html');
	});

	app.get('/components/stepper', function( req, res ){
		res.render('components/form-elements/stepper.html');
	});

	app.get('/components/add-another', function( req, res ){
		res.render('components/form-elements/add-another.html');
	});

	app.post('/add-another', urlBodyParser, jsonBodyParser, defaultBodyParser, function( req, res ){
		var util = require('util');
		console.log(util.inspect(req.body, { depth: 4 }));
		res.redirect('/components/add-another');
	});

	app.post('/upload', function(req, res) {
		console.log(req.file);
		console.log(req.files);
		console.log(req.body.file);
		res.render('components/form-elements/add-another.html');
	});

	// Pages

	app.get('/', function(req, res) {
		res.render('index.html');
	});

	app.get('/components/', function(req, res) {
		res.render('components/index.html', {
			
		});
	});

	app.get('/patterns/', function(req, res) {
		res.render('patterns/index.html');
	});

	// Patterns

	app.get('/patterns/add-another', function(req, res) {
		res.render('patterns/add-another.html');
	});

	app.get('/patterns/validation', function( req, res ){
		res.render('patterns/validation.html');
	});

	app.get('/patterns/payment', function( req, res ){
		res.render('patterns/payment.html');
	});

	app.get('/patterns/dates', function( req, res ){
		res.render('patterns/dates.html');
	});

	app.get('/patterns/seats', function( req, res ){
		res.render('patterns/seats.html');
	});

	// Examples

	app.get('/examples/payment', function( req, res ){
		res.render('examples/payment.html');
	});

	app.get('/examples/validation', function( req, res ){
		res.render('examples/validation.html');
	});

	app.get('/examples/seat-chooser', function( req, res ){
		res.render('examples/seat-chooser.html');
	});

	app.get('/examples/seat-chooser-nested', function( req, res ){
		res.render('examples/seat-chooser-nested.html');
	});

	app.get('/examples/seat-chooser-nested', function( req, res ){
		res.render('examples/seat-chooser-nested.html');
	});

};
