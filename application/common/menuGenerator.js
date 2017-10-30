module.exports = getTopMenus;

function getTopMenus( path, connection ){
  return new Promise( function(resolve, reject){
    var promises = [];

    promises.push( mysqlHandler.executeQuery("getTopLeftMenus", connection) );
    promises.push( mysqlHandler.executeQuery("getTopRightMenus", connection) );
    promises.push( getForkCount() );

    Promise.all( promises )
    .then( function(){
      var argv = arguments[0];

      var topLeftMenus = argv[0].results;
      var topRightMenus = argv[1].results;
      var forksCount = argv[2];

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

      resolve( {topLeftMenus : topLeftMenus, topRightMenus : topRightMenus} );
    } )
    .catch( err => reject( err ) );
  } );
}

function getForkCount(){
  return new Promise( function(resolve, reject){
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    //
    // var request = require( "request" );
    //
    // var options = {
    //   url: "https://api.github.com/repos/inodient/summer-mvc-com",
    //   headers: {
    //     'User-Agent': 'node.js'
    //   }
    // };
    //
    // request( options, function(error, response, body){
    //   if( error ) reject( error );
    //   resolve( JSON.parse(body).forks_count );
    // } );

    resolve( 1,792 );
  } );
}
