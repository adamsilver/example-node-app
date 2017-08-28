module.exports = function( express, app ){

	// app.get('/', function( req, res ){
	// 	res.render('index.html');
	// });

	app.get( '/components/menus/action-menu', function( req, res ){
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

	app.get('/components/payment', function( req, res ){
		res.render('components/forms/payment.html');
	});

	app.get('/components/seat-chooser', function( req, res ){
		res.render('components/forms/seat-chooser.html');
	});


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

	app.get('/components/memorable-date-field', function( req, res ){
		res.render('components/form-elements/memorable-date-field.html');
	});

	app.get('/components/date-picker-field', function( req, res ){
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

	app.post('/add-another', function( req, res ){
		var util = require('util');
		console.log(util.inspect(req.body, { depth: 4 }));
		res.redirect('/components/add-another');
	});
};