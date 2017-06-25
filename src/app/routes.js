module.exports = function( express, app ){

	app.get( '/', function( req, res ){

		res.render( 'index.html' );
	} );

	app.get( '/colours', function( req, res ){

		res.render( 'colours.html' );
	} );
};