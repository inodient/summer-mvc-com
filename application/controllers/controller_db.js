exports.control = function( req, res, connection ){

	return new Promise( function(resolve, reject){

		var params = [];
		var queryId = req.query.selectedQueryId;

		if( queryId === "getAccessLog" ){
			params.push( "2017-09-01", "2017-09-30" );
		} else if( queryId === "insertAccessLog" ){
			params.push( (new Date()).toISOString() );
			params.push( "inodient" );
			params.push( req._parsedUrl.pathname );
			params.push( JSON.stringify( req.query, null, 4 ) );
			params.push( JSON.stringify( req.params, null, 4 ) );
			params.push( req.method );
		} else if( queryId === "updateAccessLog" ){
			params.push( "inodient" );
			params.push( "your_user_id" );
		} else if( queryId === "deleteAccessLog" ){
			params.push( "%getData%" );
		}

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			logger.debug( queryResults.results );
			resolve( setModel( req, res, JSON.stringify(queryResults.results, null, 4), null ) );
		} )
		.catch( function(err){
			reject( err );
		} );

	} );


//	mysqlHandler.getConnection( pool )
//	.then( function(connection){
//		mysqlHandler.executeQuery( "getMysqlVersion", connection )
//		.then( function(queryResults){
//			mysqlHandler.releaseConnection( connection );
//			logger.debug( queryResults.results );
//		} );
//	} )
//	.catch( function(err){
//		logger.error( err );
//	} );

	// mysqlHandler.getConnection( pool )
	// .then( mysqlHandler.executeQuery.bind( null, "getMysqlVersion" ) )
	// .then( function(results){
	// 	logger.info( results.results );
	// } )
	// .catch( function(err){
	// 	logger.error( err );
	// } );

	// mysqlHandler.getConnection()
	// .then( mysqlHandler.executeQuery.bind( null, "getMySqlVersion" ) )
	// .then( function(results){
	// 	logger.info( results.results );
	// } )
	// .catch( function(err){
	// 	logger.error( err );
	// } );



	// mysqlHandler.executeQuery( "getMySqlVersion" )
	// .then( function(results){
	// 	logger.info( results.results );
	// } )
	// .catch( function(err){
	// 	logger.error( err );
	// } );

}

function setModel( req, res, results, fields ){

	var queries = require( __mysqlQueries );
	var model = {};

	try{
		model.method = req.method;
		model.path = req._parsedUrl.pathname;
		model.queryString = JSON.stringify( req.query, null, 4 );
		model.params = JSON.stringify( req.params, null, 4 );

		model.message = results;
		model.queries = queries;

		return model;
	} catch( err ){
		throw err;
	}
}









//const pool = mysql.createPool( require( require("path").join(process.cwd(), "properties", "db.json") ) );
//
//exports.control = function( req, res ){
//
//  console.log( require("os").cpus().length );
//
//  return new Promise( function(resolve, reject){
//    getCurrentTime()
//    .then( getDBVersion )
//    .then( function( results ){
//      resolve( setModel( req, res, results, null ) );
//    } );
//  } );
//}
//
//function getCurrentTime(){
//  return new Promise( function(resolve, reject){
//     pool.query( "select NOW(), CURDATE(), CURTIME()", function( err, results, fields ){
//       console.log( results );
//       resolve( results );
//     } )
//  } );
//}
//
//function getDBVersion(){
//  return new Promise( function(resolve, reject){
//    pool.query( "select * from connectionInfo", function( err, results, fields ){
//      console.log( results );
//      resolve( results );
//    } )
//  } );
//}
//
//
//
//
//function setModel( req, res, results, fields ){
//  var model = {};
//
//  try{
//    model.method = req.method;
//    model.path = req._parsedUrl.pathname;;
//    model.postMessage = "";
//    model.queryString = JSON.stringify( req.query, null, 4 );
//    model.params = JSON.stringify( req.params, null, 4 );
//    model.controllerName = require( "path" ).basename( __filename );
//    model.controlFunction = "control";
//    model.dbRes = JSON.stringify( results[0], null, 4 );
//    model.ajaxResult = "-";
//
//    return model;
//  } catch( err ){
//    throw err;
//  }
//
//}
