var menuService = require( require("path").join(process.cwd(),"application", "services", "service_menu.js") );




exports.control = function( req, res, connection ){

  return new Promise( function(resolve, reject){

  	menuService.getMenus( req, res, connection )
  	.then( function( menus ){
  		logger.debug( menus );

  		resolve( menus );
  	} )
  	.catch( function( err ){
  		reject( err );
  	} );
  } );
}
