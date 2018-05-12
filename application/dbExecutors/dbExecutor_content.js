exports.deleteContent = function( targetId, connection ){
	return new Promise( function(resolve, reject){
		var queryId = "deleteContent";
		var params = [];

		params.push( {"CATEGORY" : targetId} );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( queryResults.result );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}

exports.insertContent = function( params, connection ){
	return new Promise( function(resolve, reject){
		var queryId = "insertContent";

		logger.debug( params );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( queryResults.result );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}