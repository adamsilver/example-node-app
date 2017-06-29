module.exports = function( express, app ){

	app.get( '/', function( req, res ){

		res.render( 'index.html' );
	} );

	app.get( '/form-validation', function( req, res ){

		res.render( 'form-validation.html' );
	} );

	app.get( '/colours', function( req, res ){

		res.render( 'colours.html' );
	} );
};