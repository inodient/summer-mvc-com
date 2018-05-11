exports.getTopLeftMenus = function( connection ){
	return new Promise( function( resolve, reject ){
		var queryId = "getTopLeftMenus";

		mysqlHandler.executeQuery(queryId, connection)
		.then( function(queryResult){
			resolve( queryResult.results );
		} )
		.catch( function(err){
			reject( err );
		} )
	} );
}

exports.getTopRightMenus = function( connection ){
	return new Promise( function( resolve, reject){
		var queryId = "getTopRightMenus";

		mysqlHandler.executeQuery(queryId, connection)
		.then( function(queryResult){
			resolve( queryResult.results );
		} )
		.catch( function(err){
			reject( err );
		} )
	} );
}

exports.getDocMenus = function( connection, path ){
	return new Promise( function( resolve, reject ){
		var params = [];
		var queryId = "getDocMenus";

		params.push( {"PATH":path} );

		mysqlHandler.executeQuery(queryId, params, connection)
		.then( function(queryResult){
			resolve( queryResult.results );
		} )
		.catch( function(err){
			reject( err );
		} )

	} );
}



