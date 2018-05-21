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
			logger.debug( queryResults);
			resolve( setModel( req, res, JSON.stringify(queryResults.results, null, 4), null ) );
		} )
		.catch( function(err){
			reject( err );
		} );

	} );
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

