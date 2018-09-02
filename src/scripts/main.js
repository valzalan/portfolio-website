//1150
const $ = require( "jquery" ),
			inlineSVG = require( "inline-svg" ),


			//------      Own modules      ------

			background = require( "./background.js" ),
			toggleNav = require( "./nav.js" ),
			navscroll = require( "./nav-scroll.js" ),
			changeVis = require( "./change-vis.js" );

//TODO: Maybe pull out to a file?
// .on("load") can't be triggered inside document.ready()

let breakPoints = [],
		posY = [];

$( window ).on( "resize load", function() {

	breakPoints = updateBrPoints();
});

$( window ).on( "scroll load", function() {

	posY[ 1 ] = posY[ 0 ];
	posY[ 0 ] = $( window ).scrollTop() + ( window.innerHeight / 2 ) + window.innerHeight * 0.15;

	background( posY, breakPoints );
});

function updateBrPoints() {

	let winHeight = $( window ).height(),
			marginHeights = 0,
			contentHeight,
			breakPoints = [],
			sections = [ "#hero", "#about", "#skills", "#projects" ];

	for ( let i = 0; i < sections.length; i++ ) {
		marginHeights += $( sections[ i ]).outerHeight( true );
		breakPoints.push( marginHeights );
	}
	return breakPoints;
}


$( document ).ready( function() {

	// Icons need to be inlined, so
	// everything starts as a callback of inlineSVG

	inlineSVG.init({
		svgSelector: "img.svg"
	}, function() {

		console.log( "All SVGs inlined" );

		changeVis( "hidden", "all", "#hero" );
		//------      Event handlers      ------

		$( "#sidebar, .nav-cross, .hamburger" ).click( function( event ) {
			$( ".nav-cross" ).removeClass( "static" );
			toggleNav( event );
		});

		$( ".nav-cross" ).hover( function() {
			$( this ).addClass( "static" );
		});
		// Project items in menu
		$( "#project-dropdown-icon" ).click( function() {

			if ( $( ".subitem" ).css( "display" ) == "list-item" ) {

				$( this ).css( "transform", "rotateZ(0deg)" );

			} else {

				$( this ).css( "transform", "rotateZ(45deg)" );
			}

			$( ".subitem" ).toggle();
		});

		// Anchor scroll
		$( "a, #contact-button, #portfolio" ).click( function( event ) {

			navscroll( event );
		});

		// Skill level bars
		$( ".skill" ).click( function( event ) {

			let id = event.currentTarget.id;

			$( "#skills" ).find( `#${id} + li` ).toggle();

			setTimeout( function() {
				$( `#${id} + li` ).find( "tr" ).toggleClass( id );
			}, 100 );
		});
	});
});
