
const $ = require( "jquery" );
const inlineSVG = require( "inline-svg" );

$( document ).ready( function() {

  inlineSVG.init( {
    svgSelector: 'img.svg'
  }, function() {
  console.log( 'All SVGs inlined' );
});


  //------      Own modules      ------

  const background = require( "./background.js" ),
        showNav = require( "./nav.js" ),
        navscroll = require( "./nav-scroll.js" );


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

    return breakPoints;
  }
});
