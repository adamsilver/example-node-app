module.exports = function( express, app ){

	app.get( '/', function( req, res ){

		res.render( 'index.html' );
	} );

	app.get( '/components', function( req, res ){

		res.render( 'components/index.html' );
	} );

	app.get( '/components/forms/validation', function( req, res ){

		res.render( 'components/forms/validation.html' );
	} );

	app.get( '/colours', function( req, res ){

		res.render( 'colours.html' );
	} );
};