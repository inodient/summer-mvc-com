var menuService = require( require("path").join(process.cwd(),"application", "services", "service_menu.js") );




exports.control = function( req, res, connection ){

  return new Promise( function(resolve, reject){

    if( req.path.indexOf( "/doc" ) >= -1 ){
      
      menuService.getMenus( req, res, connection )
      .then( function( menus ){
        resolve( menus );
      } )
      .catch( function( err ){
        reject( err );
      } );

    } else if( req.path.indexOf( "/write" ) >= -1 ){

      menuService.getMenus( req, res, connection )
      .then( function( menus ){
        resolve( menus );
      } )
      .catch( function( err ){
        reject( err );
      } );

    }
  } );
}
