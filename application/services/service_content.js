var contentDbExecutor = require( require( "path" ).join( process.cwd(), "application", "dbExecutors", "dbExecutor_content.js" ) );




exports.saveContent = function( req, res, connection ){
	return new Promise( function(resolve, reject){
		var contents = JSON.parse( req.body.contents );

		// {
	 //        "category": "15",
	 //        "name": "editor_15",
	 //        "content": "<p><br></p>"
	 //    },

	 	var promises = [];

	 	for( var i=0; i<contents.length; i++ ){
	 		promises.push( updateContent( contents[i], connection ) );
	 	}

	 	Promise.all( promises )
	 	.then( function(){
	 		resolve( {"message" : "succeed"} );
	 	} )
	 	.catch( function(err){
	 		reject( err );
	 	} );
		

	} );
}





function updateContent( editorText, connection ){
	return new Promise( function(resolve, reject){
		var targetId = editorText.category;
		var text = editorText.content;
		var name = editorText.name;

		deleteContent( targetId, connection )
		.then( function( result ){

			 // (#CATEGORY#, 
    //             #DATE#, 
    //             #TITLE_KO#,
    //             ##TITLE_EN#, 
    //             #CONTENT_KO#, 
    //             #CONTENT_EN#)

    		var date = new Date();
    		date = ( date.toISOString() ).split("T")[0];

			var params = [];
			params.push( { "CATEGORY" : targetId } );
			params.push( { "DATE" : date } );
			params.push( { "TITLE_KO" : name } );
			params.push( { "TITLE_EN" : name } );
			params.push( { "CONTENT_KO" : text } );
			params.push( { "CONTENT_EN" : text } );

			insertContent( params, connection )
			.then( function( _results){
				resolve( {} );
			} )
			.catch( function(_err){
				reject( _err );
			} )

		} )
		.catch( function(err){
			reject( err );
		} )

	} );
}

function deleteContent( targetId, connection ){
	return new Promise( function(resolve, reject){
		contentDbExecutor.deleteContent( targetId, connection )
		.then( function(result){
			resolve( result );
		} )
		.catch( function(err){
			reject( err ); 
		} );
	} );
}

function insertContent( params, connection ){
	return new Promise( function(resolve, reject){
		contentDbExecutor.insertContent( params, connection )
		.then( function(result){
			resolve( result );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}