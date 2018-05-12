var contentService = require( require("path").join( process.cwd(), "application", "services", "service_content.js") );





exports.control_save_content = function( req, res, connection ){
	return new Promise( function(resolve, reject){

		contentService.saveContent( req, res, connection )
		.then( function( results ){
			resolve( {"message" : "GooDDDDDDD!!!!!!"} );
		} )
		.catch( function(err){
			reject( err );
		} )
	} );
}