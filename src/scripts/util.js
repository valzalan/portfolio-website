//TODO: Refactor!

const $ = require( "jquery" );

  function background( posY, breakPoints ) {
    //TODO: Maybe implement a hex converter??
  	const primaryColor = "rgb(14, 11, 22)",
  				secondaryColor = "rgb(242, 242, 242)";

  	if ( posY[ 0 ] <= breakPoints[ 0 ] && posY[ 1 ] > breakPoints[ 0 ]) {

  		_changeVis( "hidden", "all" );
  		switchColors( primaryColor );
  		$( "#sectionName" ).text( "01_home" );
  		setTimeout( function() {
  			_changeVis( "visible", "#hero" );
  		}, 300 );
  	}

  	if (( posY[ 0 ] >= breakPoints[ 0 ] && posY[ 1 ] < breakPoints[ 0 ]) ||
  			( posY[ 0 ] <= breakPoints[ 2 ] && posY[ 1 ] > breakPoints[ 2 ])) {
  		_changeVis( "hidden", "all" );
  		switchColors( secondaryColor );
  		setTimeout( function() {
  			_changeVis( "visible", "#about, #skills" );
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

  		_changeVis( "hidden", "all" );
  		switchColors( primaryColor );
  		$( "#sectionName" ).text( "04_projects" );
  		setTimeout( function() {
  			_changeVis( "visible", "#projects" );
  		}, 300 );
  	}

  	if (( posY[ 0 ] >= breakPoints[ 3 ] && posY[ 1 ] < breakPoints[ 3 ]) ||
  			( posY[ 0 ] <= breakPoints[ 4 ] && posY[ 1 ] > breakPoints[ 4 ])) {

  		_changeVis( "hidden", "all" );
  		switchColors( secondaryColor );
  		$( "#sectionName" ).text( "05_contact" );
  		setTimeout( function() {
  			_changeVis( "visible", "#contact" );
  		}, 300 );
  	}
  }

  function switchColors( backgroundColor ) {
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

  function _changeVis( visibility, section, except ) {
    if ( section == "all" ) {

  		section = $( "section.wrapper" );
  	}

  	if ( except !== undefined ) {

  		if ( visibility == "hidden" ) {

  			$( section ).not( except ).animate({
  				opacity: 0
  			}, 400 );

  		} else if ( visibility == "visible" ) {

  			$( section ).not( except ).animate({
  				opacity: 1
  			}, 400 );
  		}
  	} else {

  		$( section ).children().css( "visibility", visibility );

  		if ( visibility == "hidden" ) {

  			$( section ).animate({
  				opacity: 0
  			}, 400 );

  		} else if ( visibility == "visible" ) {

  			$( section ).animate({
  				opacity: 1
  			}, 400 );
  		}
  	}
  }

function changeLines( width, lineCount ) {
    if (( width < 750 && lineCount == 6 ) ||
        ( width < 350 && lineCount == 5 )) {

  		$( ".bckgrLines" ).find( "div:visible:last" ).hide();
  		$( ".bckgrLines" ).css( "grid-template-columns", `repeat(${lineCount - 1}, 1fr)` );
  	}

  	if (( width > 750 && lineCount == 5 ) ||
        ( width > 350 && lineCount == 4 )) {

  		$( ".bckgrLines" ).find( "div:visible:last" ).show();
  		$( ".bckgrLines" ).css( "grid-template-columns", `repeat(${lineCount + 1}, 1fr)` );
  	}
  }

module.exports = {
  background: background,
  switchColors: switchColors,
  _changeVis: _changeVis,
  changeLines: changeLines
}
