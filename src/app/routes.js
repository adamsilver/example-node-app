module.exports = function( express, app ){

	app.get('/', function( req, res ){
		res.render('index.html');
	});

	app.get( '/components/colours', function( req, res ){
		res.render('components/colours.html');
	});

	app.get('/components', function(req, res ){
		res.render('components/index.html');
	});

	app.get('/components/validation', function( req, res ){
		res.render('components/validation.html');
	});

	app.get('/components/text-box', function( req, res ){
		res.render('components/text-box.html');
	});

	app.get('/components/textarea', function( req, res ){
		res.render('components/textarea.html');
	});

	app.get('/components/date-field', function( req, res ){
		res.render('components/date-field.html');
	});

	app.get('/components/characters-remaining', function( req, res ){
		res.render('components/characters-remaining.html');
	});
};