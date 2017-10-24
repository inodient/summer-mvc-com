exports.control = function( req, res, connection ){

  var getTopMenus = require( require("path").join(process.cwd(),"application", "common", "menuGenerator.js") );

  return new Promise( function(resolve, reject){

    var promises = [];

    promises.push( getTopMenus(req.path, connection) );
    promises.push( getNPMCount() );

    Promise.all( promises )
    .then( function(){
      var argv = arguments[0];
      var results = {};
      
      results = Object.assign( argv[0], argv[1] );
      resolve( results );
    } )
    .catch( function(err){
      reject( err );
    } );


    // getTopMenus( req.path, connection )
    // .then( function(){
    //   resolve( arguments[0] );
    // } );
  } );
}




function getNPMCount(){
  return new Promise( function(_resolve, _reject){
    var today = new Date();
    today = today.toISOString().substring(0, 10);

    const request = require( "request" );

    const request_prefix = "https://api.npmjs.org/downloads/point/";
    const request_postfix = "/summer-mvc";

    var promises = [];

    // last week
    promises.push( new Promise( function(resolve, reject){
      request( request_prefix + "last-week" + request_postfix, function(err, response, body){
        if( err ) reject( err );
        resolve( ( JSON.parse(body) ).downloads );
      } );
    } ) );

    // last month
    promises.push( new Promise( function(resolve, reject){
      request( request_prefix + "last-month" + request_postfix, function(err, response, body){
        if( err ) reject( err );
        resolve( ( JSON.parse(body) ).downloads );
      } );
    } ) );

    // total
    promises.push( new Promise( function(resolve, reject){
      request( request_prefix + "1900-01-01:" + today + request_postfix, function(err, response, body){
        if( err ) reject( err );
        resolve( ( JSON.parse(body) ).downloads );
      } );
    } ) );

    Promise.all( promises )
    .then( function(){
      var argv = arguments[0];
      
      var results = {};
      
      results.last_week = argv[0];
      results.last_month = argv[1];
      results.total = argv[2];
      
      _resolve( results );
    } )
    .catch( function(err){
      _reject( err );
    } );

  } );
}
