var menuDbExecutor = require( require( "path" ).join( process.cwd(), "application", "dbExecutors", "dbExecutor_menu.js" ) );




exports.getMenus = function( req, res, connection ){
	return new Promise( function(resolve, reject){

		var promises = [];

		var path = req.originalUrl;
		// path = path.replace( "/doc", "" );
		path = path.replace( "/write", "/doc" );

	    promises.push( menuDbExecutor.getTopLeftMenus(connection) );
	    promises.push( menuDbExecutor.getTopRightMenus(connection) );
	    promises.push( menuDbExecutor.getDocMenus(connection, path) );
	    promises.push( getForkCount() );

	    Promise.all( promises )
	    .then( function(){
	      var argv = arguments[0];

	      var topLeftMenus = argv[0];
	      var topRightMenus = argv[1];
	      var docMenus = argv[2];
	      var forksCount = argv[3];

	      var findActive = false;

	      for( var i=0; i<topLeftMenus.length; i++ ){
	        if( topLeftMenus[i].redirectpath === path ){
	          topLeftMenus[i].active = "active";
	          findActive = true;
	          break;
	        }
	      }

	      for( var i=0; i<topRightMenus.length; i++ ){
	        if( topRightMenus[i].redirectpath === path ){
	          topRightMenus[i].active = "active";
	          findActive = true;
	        }
	        if( topRightMenus[i].name == "github" ){
	          logger.debug( "forksCount", forksCount );
	          topRightMenus[i].displayname = forksCount;
	        }
	      }

	      resolve( {topLeftMenus : topLeftMenus, topRightMenus : topRightMenus, docMenus : docMenus} );
	    } )
	    .catch( err => reject( err ) );


	} );
}




function getForkCount(){
  return new Promise( function(resolve, reject){
     process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

     var request = require( "request" );

     var options = {
       url: "https://api.github.com/repos/inodient/summer-mvc-com",
       headers: {
         'User-Agent': 'node.js'
       }
     };

    // Git Hub Fork Count
     request( options, function(error, response, body){
       if( error ) reject( error );
       resolve( JSON.parse(body).forks_count );
     } );

//    resolve( "1,792" );
  } );
}