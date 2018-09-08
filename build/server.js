const express = require( "express" ),
      http = require( "http" ),
      path = require( "path" ),
      nodemailer = require( "nodemailer" ),
      bodyParser = require( "body-parser" ),
      expressSanitizer = require( "express-sanitizer" ),

      app = express(),
      server = http.Server( app );

const port = process.env.PORT || 3000;

app.use( bodyParser.urlencoded( {extended: true} ));
app.use( expressSanitizer() );

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
  res.sendFile( path.join( __dirname, "public/pages/resume/zalan_valko_resume_2018.pdf" ));
});

app.post( "/contact", function ( req, res ) {
  let data = {
    name: req.sanitize( req.body.name ),
    email: req.sanitize( req.body.email ),
    phone: req.sanitize( req.body.phone ),
    message: req.sanitize( req.body.message )
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: data.email,
    to: "valzalan@gmail.com",
    subject: "Email sent from valzalan.me",
    text: ["You received the following message from: " + data.email + ", " + data.phone + "\n",
      "The message:\n" + data.message].join("")
  };

  transporter.sendMail( mailOptions, function ( err, info ) {
    if ( err ) {
      console.log( err );
      res.send( "error" );
   } else {
      console.log( info );
      res.send( "ok" );
   }
 });
});

// Starts the server.
server.listen( port, function() {
  console.log( "Starting server on: " + port );
});
