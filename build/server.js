const express = require( "express" ),
      http = require( "http" ),
      path = require( "path" ),
      //nodemailer = require( "nodemailer" ),
      app = express(),
      server = http.Server( app );
      //bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

//app.use(bodyParser.urlencoded({extended: true}));

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
/*
app.post('/contact', function (req, res) {

  let transporter = nodemailer.createTransport({
    service: 'SendPulse',
    auth: {
      user: "valzalan@gmail.com",
      pass: "wales3734<>12"
    }
  });

  let mailOptions = {
    from: req.body.email,
    to: "valzalan@gmail.com",
    subject: "Message from valzalan.me",
    text: req.body.message
  };

  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.render('contact-failure');
    }
    else {
      res.render('contact-success');
    }
  });
});
*/
// Starts the server.
server.listen( port, function() {
  console.log( "Starting server on port 5000" );
});
