
const gulp = require( "gulp" ),
      browserify = require( "browserify" ),
      uglify = require( "gulp-uglify" ),
      babel = require( "gulp-babel" ),
      source = require( "vinyl-source-stream" ),
      buffer = require( "vinyl-buffer" ),
      sourcemaps = require( "gulp-sourcemaps" ),
      sass = require( "gulp-sass" ),
      log = require( "gulplog" );


gulp.task( "bundle-js", function() {
  var b = browserify( {
    entries: "./src/scripts/main.js",
    debug: true
  });

  return b.bundle()
    .pipe( source( "bundle.js" ) )
    .pipe( buffer() )
    .pipe( babel( {
      presets: [ "env" ]
    }))
    .pipe( sourcemaps.init( {
      loadMaps: true
    }))
      .pipe( uglify() )
      .on( "error", log.error )
    .pipe( sourcemaps.write( "./" ) )
    .pipe( gulp.dest( "./build/scripts/" ) );
});

gulp.task( "uglify-page-generator", function() {

    return gulp.src( "./src/project_pages/scripts/generate-page.js" )
      .pipe( babel( {
        presets: [ "env" ]
      }))
      .pipe( uglify() )
      .pipe( gulp.dest( "./build/project_page/scripts/" ) );
});

gulp.task( "sass", function() {

  return gulp.src( "./src/styles/main.scss" )
    .pipe( sourcemaps.init() )
    .pipe( sass( {
      outputStyle: "compressed"
    })
      .on( "error", sass.logError ) )
    .pipe( sourcemaps.write( "./" ) )
    .pipe( gulp.dest( "./build/styles/" ) )
    .pipe( gulp.dest( "../valzalan.github.io/styles/" ) );
});

gulp.task( "watch", [ "sass", "bundle-js", "uglify-page-generator" ], function() {

  gulp.watch( "./src/scripts/**/*.js", [ "bundle-js" ] );
  gulp.watch( "./src/styles/**/*.scss", [ "sass" ] );
  gulp.watch( "./src/project_pages/scripts/generate-page.js", [ "uglify-page-generator" ] );
});

//              For prototyping

gulp.task( "sass-proto", function() {

  return gulp.src( "./prototype/src/styles/main.scss" )
    .pipe( sourcemaps.init() )
    .pipe( sass( {
      outputStyle: "compressed"
    })
      .on( "error", sass.logError ) )
    .pipe( sourcemaps.write( "./" ) )
    .pipe( gulp.dest( "./prototype/build/styles/" ) );
});

gulp.task( "watch-proto", [ "sass-proto" ], function() {

  //gulp.watch( "./prototype/src/scripts/**/*.js", [ "bundle-js-proto" ] );
  gulp.watch( "./prototype/src/styles/**/*.scss", [ "sass-proto" ] );
});

//   Default

gulp.task( "default", [ "bundle-js", "sass" ] );
