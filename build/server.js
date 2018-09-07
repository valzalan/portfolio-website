const express = require( "express" ),
      http = require( "http" ),
      path = require( "path" ),
      emailService = require( "./emailService.js" );
      bodyParser = require( "body-parser" ),
      app = express(),
      server = http.Server( app );

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use( express.static( __dirname + "/public" ));

//TODO: Refactor routing
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

app.post('/contact', function () {
  let from = "test@testing.com",
      to = "valzalan@gmail.com",
      title = "Test",
      text = "Testing email service";

  EmailService.sendText(from, to, title, text)
  .then( () => {
    console.log("Email sent successfully!");
  })
  .catch( () => {
    console.log("Error sending email!");
  })
});

// Starts the server.
server.listen( port, function() {
  console.log( "Starting server on port 5000" );
});
