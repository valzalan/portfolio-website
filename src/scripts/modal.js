const $ = require( "jquery" );

class Modal {

	constructor() {
		this.activeModalSection = "";
	}

	_resolveSectionName( section ) {
		if ( section == "projects" ) {
			return $( ".projects-nopage-modal" );
		} else if ( section == "contact" ) {
			return $( ".contact-modal" );
		} else {
			return undefined;
		}
	}

	init( args ) {

		let container = this._resolveSectionName( args.section );

		if ( args.section == "projects" ) {

			switch ( args.projectId ) {
			case "sudoku-anchor":
				$( "#modal-link" ).attr( "href", "https://github.com/valzalan/sudoku-solver" );
				break;

			case "portfolio-anchor":
				$( "#modal-link" ).attr( "href", "https://github.com/valzalan/portfolio-website" );
				break;

			case "todolist-anchor":
				$( "#modal-link" ).attr( "href", "https://github.com/valzalan/to-do-list" );
				break;

			case "dominio-anchor":
			default:
				$( "#modal-link" ).attr( "href", "" );
			}

		} else if ( args.section == "contact" ) {
			if ( args.type == "ok" ) {
				container.toggleClass( "ok" );
				container.find( "h1" ).text( "Thank you for contacting me! :)" );
				container.find( "p" ).text( "I will reply shortly." );
			} else if ( args.type == "error" ) {
				container.toggleClass( "error" );
				container.find( "h1" ).text( "Sorry, there was an error sending your message. :(" );
				container.find( "p" ).text( "If the problem persists, try to contact me via a different method." );
			}
		}
	}

	show( section ) {
		let container = this._resolveSectionName( section );
		this.activeModalSection = section;
		//	Remove hiding animation
  	$( container ).removeClass( "animOut" );
  	$( container ).show();
	}

	hide( section ) {
		if ( section == undefined ) {
			section = this.activeModalSection;
		}

		let container = this._resolveSectionName( section );
		//	Add hiding animation
  	$( container ).addClass( "animOut" )
		  .bind( "animationend", function hideModal() {
			  $( container ).hide()
			  .unbind( "animationend", hideModal );
			});
		this.activeModalSection = "";
	}
}

module.exports = new Modal();
