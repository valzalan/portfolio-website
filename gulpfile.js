
'use strict';

const gulp = require( "gulp" );

//    JavaScript bundling
const browserify = require( "browserify" ),
      babel = require( "gulp-babel" ),
      uglify = require( "gulp-uglify" );

//    Utilities
const source = require( "vinyl-source-stream" ),
      buffer = require( "vinyl-buffer" ),
      sourcemaps = require( "gulp-sourcemaps" ),
      log = require( "gulplog" );

//    Sass
const sass = require( "gulp-sass" );

//---------------------------
//    Tasks for main page
//---------------------------

gulp.task( "bundle-js", function() {

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
    .pipe( gulp.dest( "./build/scripts/" ));
});

gulp.task( "sass", function() {

 return gulp.src( "./src/styles/**/*.scss" )
  .pipe( sourcemaps.init() )

  .pipe( sass( {
    outputStyle: "compressed"
  }).on( "error", sass.logError ))

  .pipe( sourcemaps.write( "./" ))
  .pipe( gulp.dest( "./build/styles/" ));
});

gulp.task( "watch", function() {
   gulp.watch( "./src/scripts/**/*.js", [ "bundle-js" ] );
   gulp.watch( "./src/styles/**/*.scss", [ "sass" ] );
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

  .pipe( sourcemaps.write( "./" ))
  .pipe( gulp.dest( "./build/pages/resume/styles/" ));
});

gulp.task( "resume-watch", function() {
    gulp.watch( "./src/styles/**/*.scss", [ "resume-sass" ] );
});

//--------------------
//    Default task
//--------------------

gulp.task( "default", [ "bundle-js", "sass" ] );
