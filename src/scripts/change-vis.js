
const $ = require("jquery");

module.exports = function( visibility, section, except ) {

  if( section == "all" ) {

    section = $( "section.wrapper" );
  }

  if( except !== undefined ) {

    if( visibility == "hidden" ) {

      $( section ).not( except ).animate({
        opacity: 0
      }, 400 );

    } else if( visibility == "visible" ) {

      $( section ).not( except ).animate({
        opacity: 1
      }, 400 );
    }
  } else {

    $( section ).children().css( "visibility", visibility );

    if( visibility == "hidden" ) {

      $( section ).animate({
        opacity: 0
      }, 400 );

    } else if( visibility == "visible" ) {

      $( section ).animate({
        opacity: 1
      }, 400 );
    }
  }
}
