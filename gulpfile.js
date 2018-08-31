
'use strict';

const gulp = require( "gulp" );

//    JavaScript bundling
const browserify = require( "browserify" ),
      babel = require( "gulp-babel" ),
      uglify = require( "gulp-uglify" ),
      eslint = require( "gulp-eslint" );

//    Utilities
const source = require( "vinyl-source-stream" ),
      buffer = require( "vinyl-buffer" ),
      sourcemaps = require( "gulp-sourcemaps" ),
      log = require( "gulplog" );

//    Css pre and postprocessing
const sass = require( "gulp-sass" ),
      autoprefixer = require( "gulp-autoprefixer" );

//---------------------------
//    Tasks for main page
//---------------------------

gulp.task( "bundle-js", [ "lint" ], function() {

  var b = browserify({
    entries: "./src/scripts/main.js",
    debug: true
  });

  return b.bundle()
    .pipe( source( "bundle.js" ))
    .pipe( buffer())
    .pipe( sourcemaps.init( { loadMaps: true } ))
        // Transforms
        .pipe( babel({
                presets: ["env"]
            }))
        .pipe( uglify() )
        .on( "error", log.error )
    .pipe( sourcemaps.write( "./" ))
    .pipe( gulp.dest( "./build/public/scripts/" ));
});

gulp.task( "lint", function() {
  return gulp.src( "./src/scripts/**/*.js" )
    .pipe( eslint( { fix: true } ))
    .pipe( eslint.format() )
    .pipe( gulp.dest( "./src/scripts/" ));
});

gulp.task( "sass", function() {

 return gulp.src( [ "./src/styles/**/*.scss", "!./src/styles/5-pages/*" ] )
  .pipe( sourcemaps.init() )

  .pipe( sass( {
    outputStyle: "compressed"
  }).on( "error", sass.logError ))
  .pipe( autoprefixer( {
    browsers: [ "last 2 versions" ],
    cascade: false
  }))
  .pipe( sourcemaps.write( "./" ))
  .pipe( gulp.dest( "./build/public/styles/" ));
});

//----------------------------
//   Tasks for resume page
//----------------------------

gulp.task( "resume-sass", function() {

 return gulp.src( "./src/styles/5-pages/resume.scss" )
  .pipe( sourcemaps.init() )

  .pipe( sass( {
    outputStyle: "compressed"
  }).on( "error", sass.logError ))
  .pipe( autoprefixer( {
    browsers: [ "last 2 versions" ],
    cascade: false
  }))
  .pipe( sourcemaps.write( "./" ))
  .pipe( gulp.dest( "./build/pages/resume/styles/" ));
});

//-------------------
//    Watch tasks
//-------------------

gulp.task( "watch", function() {
   gulp.watch( "./src/scripts/**/*.js", [ "bundle-js" ] );
   gulp.watch( [ "./src/styles/**/*.scss", "!./src/styles/5-pages/*"], [ "sass" ] );
   //TODO: implement a routing algorithm for future pages
   gulp.watch( "./src/styles/5-pages/*.scss", [ "resume-sass" ] );
});

//--------------------
//    Default task
//--------------------

gulp.task( "default", [ "bundle-js", "sass", "resume-sass" ] );
