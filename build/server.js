const express = require( "express" ),
      http = require( "http" ),
      path = require( "path" ),
      nodemailer = require( "nodemailer" ),
      bodyParser = require( "body-parser" ),
      expressSanitizer = require( "express-sanitizer" );

const app = express(),
      server = http.Server( app );

const port = process.env.PORT || 3000;

app.use( bodyParser.urlencoded( {extended: true} ));
app.use( expressSanitizer() );

app.use( express.static( __dirname + "/public" ));

const routes = {
  "/": "index.html",
  "/sudoku": "pages/sudoku.html",
  "/todolist": "pages/todolist.html",
  "/resume": "public/pages/resume/zalan_valko_resume_2018.pdf"
};

//  Routing
app.get( /^\//, function( req, res ) {
  if( routes.hasOwnProperty( req.originalUrl ) ) {
    res.sendFile( path.join( __dirname, routes[ req.originalUrl ] ) );
  } else {
    res.status( 404 ).send( "Sorry, I didn't find the page you were looking for :(" );
  }
});

app.post( "/contact", function ( req, res ) {
  let data = {
    name:    req.sanitize( req.body.name ),
    email:   req.sanitize( req.body.email ),
    phone:   req.sanitize( req.body.phone ),
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
  console.log( "Starting server on port: " + port );
});
