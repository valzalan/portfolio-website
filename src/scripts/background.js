
//TODO: Refactor to only fire changes when present scroll inside, but
// previous scroll is outside of brpoint. (solves some minor bugs)

const $ = require( "jquery" ),
			switchColors = require( "./switch-colors.js" ),
			changeVis = require( "./change-vis.js" );

module.exports = function( posY, breakPoints ) {

	//TODO: Maybe implement a hex converter??
	const primaryColor = "rgb(14, 11, 22)",
				secondaryColor = "rgb(242, 242, 242)";

	if ( posY[ 0 ] <= breakPoints[ 0 ] && posY[ 1 ] > breakPoints[ 0 ]) {

		changeVis( "hidden", "all" );
		switchColors( primaryColor );
		$( "#sectionName" ).text( "01_home" );
		setTimeout( function() {
			changeVis( "visible", "#hero" );
		}, 300 );
	}

	if (( posY[ 0 ] >= breakPoints[ 0 ] && posY[ 1 ] < breakPoints[ 0 ]) ||
			( posY[ 0 ] <= breakPoints[ 2 ] && posY[ 1 ] > breakPoints[ 2 ])) {
		changeVis( "hidden", "all" );
		switchColors( secondaryColor );
		setTimeout( function() {
			changeVis( "visible", "#about, #skills" );
		}, 300 );

		if (( posY[ 0 ] >= breakPoints[ 0 ] && posY[ 1 ] < breakPoints[ 0 ]) ||
			  ( posY[ 0 ] <= breakPoints[ 1 ] && posY[ 1 ] > breakPoints[ 1 ])) {
			$( "#sectionName" ).text( "02_about" );

		} else if (( posY[ 0 ] >= breakPoints[ 1 ] && posY[ 1 ] < breakPoints[ 1 ]) ||
						 	 ( posY[ 0 ] <= breakPoints[ 2 ] && posY[ 1 ] > breakPoints[ 2 ])) {
			$( "#sectionName" ).text( "03_skills" );
		}
	}

	if (( posY[ 0 ] >= breakPoints[ 2 ] && posY[ 1 ] < breakPoints[ 2 ]) ||
			( posY[ 0 ] <= breakPoints[ 3 ] && posY[ 1 ] > breakPoints[ 3 ])) {

		changeVis( "hidden", "all" );
		switchColors( primaryColor );
		$( "#sectionName" ).text( "04_projects" );
		setTimeout( function() {
			changeVis( "visible", "#projects" );
		}, 300 );
	}

	if (( posY[ 0 ] >= breakPoints[ 3 ] && posY[ 1 ] < breakPoints[ 3 ]) ||
			( posY[ 0 ] <= breakPoints[ 4 ] && posY[ 1 ] > breakPoints[ 4 ])) {

		changeVis( "hidden", "all" );
		switchColors( secondaryColor );
		$( "#sectionName" ).text( "05_contact" );
		setTimeout( function() {
			changeVis( "visible", "#contact" );
		}, 300 );
	}
}
/*
	if ( posY <= breakPoints[ 0 ]) {

		if ( $( "body" ).css( "backgroundColor" ) == secondaryColor ) {

			switchColors( primaryColor );
			changeVis( "visible", "#hero" );
			changeVis( "hidden", "all", "#hero" );

			$( "#sectionName" ).text( "01_home" );
			//TODO: Animate center line in hero area
			//$( "#scroll" ).find("rect").css( "width" ) += posY;
		}
	}

	if ( posY > breakPoints[ 0 ] && posY <= breakPoints[ 2 ]) {

		if ( $( "body" ).css( "backgroundColor" ) == primaryColor ) {

			switchColors( secondaryColor );
			changeVis( "visible", "#about, #skills" );
			changeVis( "hidden", "all", "#about, #skills" );
		}

		if ( posY < breakPoints[ 1 ]) {
			$( "#sectionName" ).text( "02_about" );
		}
	}

	if ( posY > breakPoints[ 1 ] && posY <= breakPoints[ 2 ]) {
		$( "#sectionName" ).text( "03_skills" );
	}

	if ( posY > breakPoints[ 2 ] && posY <= breakPoints[ 3 ]) {

		if ( $( "body" ).css( "backgroundColor" ) == secondaryColor ) {

			switchColors( primaryColor );
			changeVis( "visible", "#projects" );
			changeVis( "hidden", "all", "#projects" );

			$( "#sectionName" ).text( "04_projects" );
		}
	}

	if ( posY > breakPoints[ 3 ]) {

		if ( $( "body" ).css( "backgroundColor" ) == primaryColor ) {

			switchColors( secondaryColor );
			changeVis( "visible", "#contact" );
			changeVis( "hidden", "all", "#contact" );

			$( "#sectionName" ).text( "05_contact" );
		}
	}
}
*/
