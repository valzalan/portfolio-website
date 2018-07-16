
const $ = require( "jquery" );

$( document ).ready( function() {

  //------      Own modules      ------

  const background = require( "./background.js" );
  const showNav = require( "./nav.js" );
  const navscroll = require( "./navscroll.js" );


  //------      Hide everything except hero area      ------

  $( "section.wrapper" ).not( "#hero" ).css( "opacity", 0 );


  //------      Event handlers      ------

  $( "#sidebar" ).click( function() {

    showNav();
  });


  $( "a, #contact-button" ).click( function( event ) {

    navscroll( event );
  });

  let breakPoints = [];

  $( window ).on( "resize load" , function() {

    breakPoints = updateBrPoints();
  });

  $( window ).on( "scroll", function() {

    let posY = $( window ).scrollTop();
    background( posY, breakPoints );
  });

  $( window ).on( "resize load", function() {

    let winWidth = $( window ).width();

    if( winWidth < 550 ) {

      $( "#hero h1" ).text( "Hi! I'm Zalán.\nTech enthusiast\n&\naspiring frontend\ndeveloper." );

    } else {

      $( "#hero h1" ).text( "Hi! I'm Zalán.\nTech enthusiast & aspiring\nfrontend developer." );
    }
  });

  function updateBrPoints() {

    let winHeight = $( window ).height();

    let marginHeights = 0, contentHeight;

    let breakPoints = [];

    let sections = [ "#hero", "#about", "#skills", "#projects" ];

    for( let i = 0; i < 4; i++ ) {

      if( i != 0 ) {

        marginHeights += $( sections[ i - 1 ] ).outerHeight( true );
      }

      contentHeight = $( sections[ i ] ).outerHeight();
      breakPoints.push( ( marginHeights + contentHeight ) - winHeight * 0.3 );
    }

    return breakPoints;
  }
});
