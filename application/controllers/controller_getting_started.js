exports.control = function( req, res, connection ){

  var getTopMenus = require( require("path").join(process.cwd(),"application", "common", "menuGenerator.js") );

  return new Promise( function(resolve, reject){
    getTopMenus( req.path, connection )
    .then( function(){
      logger.debug( arguments[0] );	
    	
      resolve( arguments[0] );
    } );
  } );
}
