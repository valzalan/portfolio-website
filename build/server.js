const express = require( "express" ),
      http = require( "http" ),
      path = require( "path" ),
      app = express(),
      server = http.Server( app );

app.set( "port", 5000 );
app.use( express.static( __dirname + "/public" ));

// Routing
app.get( "/", function( req, res ) {
  res.sendFile( path.join( __dirname, "index.html" ));
});

app.get( "/sudoku", function( req, res ) {
  res.sendFile( path.join( __dirname, "pages/sudoku.html" ));
});

app.get( "/todolist", function( req, res ) {
  res.sendFile( path.join( __dirname, "pages/todolist.html" ));
});

app.get( "/resume", function( req, res ) {
  res.sendFile( path.join( __dirname, "public/pages/resume/zalan_valko_resume_2018-bw.pdf" ));
});

// Starts the server.
server.listen( 5000, function() {
  console.log( "Starting server on port 5000" );
});
