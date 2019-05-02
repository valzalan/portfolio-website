//---------------
//    Imports
//---------------

const $ = require( "jquery" ),
	  inlineSVG = require( "inline-svg" );

//		Own modules
const util = require( "./util.js" ),
	  nav = require( "./nav.js" );

//     Global variables
let breakPoints = [],
    posY = [];

$( window ).on( "resize load", function() {
	breakPoints = util.updateBrPoints();
});

$( window ).on( "scroll load", function() {

	posY[ 1 ] = posY[ 0 ];
	posY[ 0 ] = $( window ).scrollTop() + ( window.innerHeight / 2 ) + window.innerHeight * 0.15;

	util.background( posY, breakPoints );
});

$( document ).ready( function() {

    // Icons need to be inlined, so
	// everything starts as a callback of inlineSVG

	inlineSVG.init({
	    svgSelector: "img.svg"
	}, function() {
	    console.log( "All SVGs inlined" );
		util._changeVis( "hidden", "all", "#hero" );
	    setEventHandlers();
        $( "#contact_form" ).on( "submit", initEmailMessage(event));
    });
});

function setEventHandlers() {

    $( "#sidebar, .nav-cross, .hamburger" ).click( function( e ) {
	    $( ".nav-cross" ).removeClass( "static" );
		nav.toggleNav( e );
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
	$( "a, #contact-button, #portfolio" ).click( function( e ) {
	    if ( e.target.id == "modal-link" ) {
		    return;
		}
		nav.navScroll( e );
	});

    // Skill level bars
    $( ".skill" ).click( function( e ) {
        let id = e.currentTarget.id;
		$( "#skills" ).find( `#${id} + li` ).toggle();
		setTimeout( function() {
			$( `#${id} + li` ).find( "tr" ).toggleClass( id );
        }, 100 );
	});
}

function initEmailMessage( e ) {
    e.preventDefault();

    let input = $( "textarea" );
    if ( input.val() == "" ) {
        input.toggleClass( "error" );
        input.parent().toggleClass( "error" );
        return;
    } else if ( input.hasClass( "error" )) {
        input.removeClass( "error" );
        input.parent().removeClass( "error" );
    }

    $.ajax({
        url: "/contact",
        type: "POST",
        data: $( this ).serialize(),
        success: function() {
            console.log("Email succesfully sent!");
            $( "input[name], textarea" ).val( "" );
        },
        error: function(err) {
            console.error("Error sending email.");
            console.error(err);
        }
    });
    return false;
}
