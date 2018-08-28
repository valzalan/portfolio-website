
const $ = require( "jquery" ),
      inlineSVG = require( "inline-svg" );


  //------      Own modules      ------

const background = require( "./background.js" ),
      toggleNav = require( "./nav.js" ),
      navscroll = require( "./nav-scroll.js" );

//TODO: Maybe pull out to a file?
// .on("load") can't be triggered inside document.ready()

let breakPoints = [];

$( window ).on( "resize load" , function() {
  console.log("updating breakpoints");
  breakPoints = updateBrPoints();
});

$( window ).on( "scroll load", function() {

  let posY = $( window ).scrollTop();
  background( posY, breakPoints );
});

function updateBrPoints() {

  let winHeight = $( window ).height(),
      marginHeights = 0,
      contentHeight,
      breakPoints = [],
      sections = [ "#hero", "#about", "#skills", "#projects" ];

  for( let i = 0; i < sections.length; i++ ) {

    if( i != 0 ) {

      marginHeights += $( sections[ i - 1 ] ).outerHeight( true );
    }

    contentHeight = $( sections[ i ] ).outerHeight();

    breakPoints.push( ( marginHeights + contentHeight ) - winHeight * 0.3 );
  }
  console.log(breakPoints);
  return breakPoints;
}


$( document ).ready( function() {

inlineSVG.init( {
  svgSelector: "img.svg"
}, function() {   // Everything starts as a callback of inlineSVG

  console.log( "All SVGs inlined" );

  //------      Hide everything except hero area      ------

  $( "section.wrapper" ).not( "#hero" ).css( "opacity", 0 );


  //------      Event handlers      ------

  $( "#sidebar, #nav-cross" ).click( function() {

    toggleNav();
  });

  $( "#project-dropdown-icon" ).click(function() {

    if( $( ".subitem" ).css( "display" ) == "list-item" ) {

      $( this ).css( "transform", "rotateZ(0deg)" );

    } else {

      $( this ).css( "transform", "rotateZ(45deg)" );
    }

    $( ".subitem" ).toggle();
  });

  $( "a, #contact-button" ).click( function( event ) {

    navscroll( event );
  });

  $( ".skill" ).click( function(event) {

    let id = event.currentTarget.id;

    $("#skills").find(`#${id} + li`).toggle();

    setTimeout(function() {
      $(`#${id} + li`).find("tr").toggleClass(id);
    }, 100);
  });

});
});
