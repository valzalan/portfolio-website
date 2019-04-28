//TODO: Refactor!

const $ = require( "jquery" ),
			inlineSVG = require( "inline-svg" );


			//------      Own modules      ------

const util = require( "./util.js" ),
			nav = require( "./nav.js" );

let breakPoints = [],
		posY = [];

$( window ).on( "resize load", function() {
	breakPoints = updateBrPoints();
});

$( window ).on( "scroll load", function() {

	posY[ 1 ] = posY[ 0 ];
	posY[ 0 ] = $( window ).scrollTop() + ( window.innerHeight / 2 ) + window.innerHeight * 0.15;

	util.background( posY, breakPoints );
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

		util._changeVis( "hidden", "all", "#hero" );
		//------      Event handlers      ------

		$( "#sidebar, .nav-cross, .hamburger" ).click( function( event ) {
			$( ".nav-cross" ).removeClass( "static" );
			nav.toggleNav( event );
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
			if ( event.target.id == "modal-link" ) {
				return;
			}
			nav.navScroll( event );
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


	//--------------------
	//		Contact POST
	//--------------------

	$( "#contact_form" ).on( "submit", function( event ) {
		event.preventDefault();

		let message = $( "textarea" );
		if ( message.val() == "" ) {
			message.toggleClass( "error" );
			message.parent().toggleClass( "error" );
			return;
		} else if ( message.hasClass( "error" )) {
			message.removeClass( "error" );
			message.parent().removeClass( "error" );
		}

		$( "html" ).toggleClass( "waitCursor" );

		$.ajax({
			url: "/contact",
			type: "POST",
			data: $( this ).serialize(),
			success: function() {
				$( "input[name], textarea" ).val( "" );
				modal.init({ section: "contact", type: "ok" });
				modal.show( "contact" );
				$( "html" ).removeClass( "waitCursor" );
			},
			error: function() {
				modal.init({ section: "contact", type: "error" });
				modal.show( "contact" );
				$( "html" ).removeClass( "waitCursor" );
			}
		});

		$( window ).one( "click", function( event ) {
			modal.hide( "contact" );
		});

		return false;
	});
});
