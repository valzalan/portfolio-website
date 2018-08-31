
const $ = require( "jquery" );

module.exports = function( event ) {

	event.preventDefault();

	let id = event.currentTarget.hash;

	if ( event.target.id == "contact-button" ) {
		id = "#contact";
	}

	if ( window.innerWidth > 750 ) {
		$( "html" ).animate({
			scrollTop: $( id ).offset().top
		}, 900 );

		$( "#navContainer > ul" ).hide();

		$( "#navContainer" ).animate({
			width: "1vw"
		}, 300, function() {
			$( "#navContainer" ).hide();
		});

	} else {
		$( "html" ).animate({
			scrollTop: $( id ).offset().top - window.innerHeight * 0.1
		}, 900 );

		$( "#navContainer > ul" ).hide();

		$( "#navContainer" ).animate({
			height: "1vh"
		}, 300, function() {
			$( "#navContainer" ).hide();
		});
	}
}
