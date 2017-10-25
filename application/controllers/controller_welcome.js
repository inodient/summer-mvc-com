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
    var weekAgo1 = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    var weekAgo2 = new Date(weekAgo1.getFullYear(), weekAgo1.getMonth(), weekAgo1.getDate() - 7);
    var weekAgo3 = new Date(weekAgo2.getFullYear(), weekAgo2.getMonth(), weekAgo2.getDate() - 7);
    var weekAgo4 = new Date(weekAgo3.getFullYear(), weekAgo3.getMonth(), weekAgo3.getDate() - 7);
    
    today = today.toISOString().substring(0, 10);
    weekAgo1 = weekAgo1.toISOString().substring( 0, 10 );
    weekAgo2 = weekAgo2.toISOString().substring( 0, 10 );
    weekAgo3 = weekAgo3.toISOString().substring( 0, 10 );
    weekAgo4 = weekAgo4.toISOString().substring( 0, 10 );
    
    logger.debug( today, weekAgo1, weekAgo2, weekAgo3, weekAgo4 );
    
    const request = require( "request" );

    const request_prefix = "https://api.npmjs.org/downloads/point/";
    const request_postfix = "/summer-mvc";

    var promises = [];

    // 4 weeks ago
    promises.push( new Promise( function(resolve, reject){
      request( request_prefix + weekAgo4 + ":" + weekAgo3 + request_postfix, function(err, response, body){
        if( err ) reject( err );
        resolve( ( JSON.parse(body) ).downloads );
      } );
    } ) );

    // 3 weeks ago
    promises.push( new Promise( function(resolve, reject){
      request( request_prefix + weekAgo3 + ":" + weekAgo2 + request_postfix, function(err, response, body){
        if( err ) reject( err );
        resolve( ( JSON.parse(body) ).downloads );
      } );
    } ) );    

    // 2 weeks ago
    promises.push( new Promise( function(resolve, reject){
      request( request_prefix + weekAgo2 + ":" + weekAgo1 + request_postfix, function(err, response, body){
        if( err ) reject( err );
        resolve( ( JSON.parse(body) ).downloads );
      } );
    } ) );        
    
    // last week
    promises.push( new Promise( function(resolve, reject){
      request( request_prefix + "last-week" + request_postfix, function(err, response, body){
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
      
      results.weeks_ago_4 = argv[0];
      results.weeks_ago_3 = argv[1];
      results.weeks_ago_2 = argv[2];
      results.last_week = argv[3];
      results.total = argv[4];
      
      _resolve( results );
    } )
    .catch( function(err){
      _reject( err );
    } );

  } );
}
