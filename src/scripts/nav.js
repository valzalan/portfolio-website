
const $ = require( "jquery" );

module.exports = function() {

  if( $( "#navContainer" ).css( "display" ) == "none" ) {

    $( "#sectionName" ).css( "color", "white" );

    $("#nav-cross").show();

    $( "#navContainer" ).show().animate({
        width: "80vw"
      }, 300, function() {

      $( "#navContainer > ul" ).show();
    });

  } else {

    $( "#navContainer > ul, #nav-cross" ).hide();

    $( "#navContainer" ).animate({
        width: "1vw"
      }, 300, function() {

      $( "#navContainer" ).hide();

      if( $( "body" ).css( "backgroundColor" ) == "rgb(242, 242, 242)" ) {

        $( "#sectionName" ).css( "color", "black" );
      }
    });

  }
}
