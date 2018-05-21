exports.control = function( req, res, connection ){
  return new Promise( function(resolve, reject){
    resolve( { message: "사랑해"} );
  } );
}
