
const $ = require( "jquery" );

module.exports = function( backgroundColor ) {

  $( "body" ).css( "backgroundColor", backgroundColor );
  $( ".line" ).toggleClass( "black" );

  if( backgroundColor == "rgb(242, 242, 242)" ) {

    $( "#sectionName" ).css( "color", "black" );

  } else if ( backgroundColor == "rgb(14, 11, 22)" ) {

    $( "#sectionName" ).css( "color", "white" );
  }
}