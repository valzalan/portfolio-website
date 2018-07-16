
const $ = require( "jquery" );

module.exports = function( width, lineCount ) {

  if( ( width < 750 && lineCount == 6 ) ||
      ( width < 350 && lineCount == 5 ) ) {

    $( ".bckgrLines" ).find( "div:visible:last" ).hide();
    $( ".bckgrLines" ).css( "grid-template-columns", `repeat(${lineCount - 1}, 1fr)` );
  }

  if( ( width > 750 && lineCount == 5 ) ||
      ( width > 350 && lineCount == 4 ) {

    $( ".bckgrLines" ).find( "div:visible:last" ).show();
    $( ".bckgrLines" ).css( "grid-template-columns", `repeat(${lineCount + 1}, 1fr)` );
  }
