
const $ = require( "jquery" );

module.exports = function( backgroundColor ) {

	$( "body" ).css( "backgroundColor", backgroundColor );

	if ( backgroundColor == "rgb(242, 242, 242)" ) {

		$( "#sectionName" ).css( "color", "black" );
		$( "#menu-icon" ).find( "rect" ).css( "fill", "black" );
		$( ".line" ).addClass( "black" );

	} else if ( backgroundColor == "rgb(14, 11, 22)" ) {

		$( "#sectionName" ).css( "color", "white" );
		$( "#menu-icon" ).find( "rect" ).css( "fill", "white" );
		$( ".line" ).removeClass( "black" );
	}
}
