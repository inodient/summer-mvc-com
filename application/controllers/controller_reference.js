exports.control = function( req, res, connection ){

  var getTopMenus = require( require("path").join(process.cwd(),"application", "common", "menuGenerator.js") );

  return new Promise( function(resolve, reject){

    var promises = [];

    promises.push( getTopMenus( req.path, connection ) );
    promises.push( getDependency( connection ) );
    promises.push( getHistory( connection ) );

    Promise.all( promises )
    .then( function(){
      var argv = arguments[0];
      var results = {};

      results = Object.assign( argv[0], argv[1], argv[2] );
      resolve( results );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}




function getDependency( connection ){
  return new Promise( function(resolve, reject){
    mysqlHandler.executeQuery( "getDependency", connection )
    .then( function( queryResults ){
      var results = {};
      results.dependency = queryResults.results

      resolve( results );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

function getHistory( connection ){
  return new Promise( function(resolve, reject){
    mysqlHandler.executeQuery( "getHistory", connection )
    .then( function( queryResults ){
      var results = {};
      results.history = queryResults.results;

      resolve( results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}
