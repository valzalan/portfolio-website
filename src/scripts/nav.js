//TODO: Refactor!

const $ = require( "jquery" );

function toggleNav( event ) {
		if ( $( "#mobile-navbar" ).css( "display" ) == "block" ) {
			// Mobile nav animation
			$( "#navContainer" ).css( "width", "100vw" );
			if ( $( "#navContainer" ).css( "display" ) == "none" ) {
				// show
				$( "#navContainer" ).css( "height", "0vh" );
				$( ".nav-cross" ).show();

				$( "#navContainer" ).show().animate({
					height: "100vh"
				}, 300, function() {

					$( "#navContainer > ul" ).show();
				});
			} else {
				// hide
				$( "#navContainer > ul, .nav-cross" ).hide();

				$( "#navContainer" ).animate({
					height: "1vh"
				}, 300, function() {

					$( "#navContainer" ).hide();
				});
			}

		} else {
			console.log("animating navigation")
			$( "#navContainer" ).css( "height", "100vh" );
			// Normal nav animation
			if ( $( "#navContainer" ).css( "display" ) == "none" ) {

				// show
				$( "#navContainer" ).css( "width", "0vw" );
				$( "#sectionName" ).css( "color", "white" );

				$( ".nav-cross" ).show();

				$( "#navContainer" ).show().animate({
					width: "80vw"
				}, 300, function() {

					$( "#navContainer > ul" ).show();
				});

			} else {

				// hide
				$( "#navContainer > ul, .nav-cross" ).hide();

				$( "#navContainer" ).animate({
					width: "1vw"
				}, 300, function() {

					$( "#navContainer" ).hide();

					if ( $( "body" ).css( "backgroundColor" ) == "rgb(242, 242, 242)" ) {

						$( "#sectionName" ).css( "color", "black" );
					}
				});
			}
		}
	}

function navScroll( event ) {
		event.preventDefault();
		console.log( event );
		let id = event.currentTarget.hash;

		if ( event.target.id == "contact-button" ) {
			id = "#contact";
		}

		if ( event.target.id == "portfolio" ) {
			id = "body";
		}

		if ( window.innerWidth > 750 ) {
			$( "html" ).animate({
				scrollTop: $( id ).offset().top
			}, 900 );

			$( "#navContainer > ul" ).hide();

			$( "#navContainer" ).animate({
				width: "1vw"
			}, 300, function() {
				$( "#navContainer" ).hide();
			});

		} else {
			$( "html" ).animate({
				scrollTop: $( id ).offset().top - window.innerHeight * 0.1
			}, 900 );

			$( "#navContainer > ul" ).hide();

			$( "#navContainer" ).animate({
				height: "1vh"
			}, 300, function() {
				$( "#navContainer" ).hide();
			});
		}
}

module.exports = {
	toggleNav: toggleNav,
	navScroll: navScroll
}
