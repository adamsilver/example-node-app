const multer = require( 'multer' );
const bodyParser = require('body-parser');

const upload = multer( {
	dest: './tmp-uploads'//,
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

	app.get( '/examples/action-menu', function( req, res ){
		res.render('examples/action-menu.html');
	});

	app.get( '/components/buttons', function( req, res ){
		res.render('components/buttons.html');
	});

	app.get( '/examples/colours', function( req, res ){
		res.render('examples/colour/colours.html');
	});

	app.get('/examples/upload-form', function( req, res ){
		res.render('components/forms/upload-form.html');
	});


	app.post('/examples/upload-form', upload.array( 'documents', 10 ), function( req, res ){
		console.log(req.files);
		res.render( 'examples/forms/upload-form.html', { files: req.files } );
	} );

	app.post('/ajax-upload', upload.array( 'documents', 10 ), function( req, res ){
		console.log(req.files);

		res.json({ files: req.files });

	} );

	app.get('/examples/text-box', function( req, res ){
		res.render('examples/text-box.html');
	});

	app.get('/examples/file-input', function( req, res ){
		res.render('examples/file-input.html');
	});

	app.get('/examples/select-box', function( req, res ){
		res.render('examples/select-box.html');
	});

	app.get('/examples/search-box', function( req, res ){
		res.render('examples/search-box.html');
	});

	app.get('/examples/textarea', function( req, res ){
		res.render('examples/textarea.html');
	});

	app.get('/examples/radio-buttons', function( req, res ){
		res.render('examples/radio-buttons.html');
	});

	app.get('/examples/checkbox-group', function( req, res ){
		res.render('examples/checkbox-group.html');
	});

	app.get('/examples/memorable-date', function( req, res ){
		res.render('examples/memorable-date-field.html');
	});

	app.get('/examples/date-picker', function( req, res ){
		res.render('examples/date-picker-field.html');
	});

	app.get('/examples/autocomplete', function( req, res ){
		res.render('examples/autocomplete.html');
	});

	app.get('/examples/characters-remaining', function( req, res ){
		res.render('examples/characters-remaining.html');
	});

	app.get('/examples/stepper', function( req, res ){
		res.render('examples/stepper.html');
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

	app.get('/examples/add-another', function( req, res ){
		res.render('examples/add-another.html');
	});

	app.post('/add-another', urlBodyParser, jsonBodyParser, defaultBodyParser, function( req, res ){
		var util = require('util');
		console.log(util.inspect(req.body, { depth: 4 }));
		res.redirect('/components/add-another');
	});

	app.get('/examples/primary-button', function( req, res ){
		res.render('examples/primary-button.html');
	});

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
