const { src, dest, parallel, series, watch } = require('gulp');

//    JavaScript bundling
const webpack = require( "webpack" );
      babel = require( "gulp-babel" ),
      butternut = require( "gulp-butternut" );

//    Utilities
const sourcemaps = require( "gulp-sourcemaps" ),
      log = require( "gulplog" ),
      webpackStream = require( "webpack-stream" ),
      webpackConfig = require( "./webpack.config.js" );

//    Css pre and postprocessing
const sass = require( "gulp-sass" ),
      autoprefixer = require( "gulp-autoprefixer" );

//---------------------------
//    JavaScript Bundling
//---------------------------

function js() {
  return src( "./src/scripts/main.js" )
    .pipe( webpackStream(webpackConfig), webpack )
    //.pipe( source( "bundle.js" ))
    //.pipe( buffer())
    .pipe( sourcemaps.init( { loadMaps: true } ))
      // Transforms
      .pipe(babel({
            presets: ['@babel/env']
        }))
      .pipe( butternut())
      .on("error", console.error.bind(console))
    .pipe( sourcemaps.write( "./" ))
    .pipe( dest( "./build/public/scripts/" ));
}

function lint() {
  return src( "./src/scripts/**/*.js" )
    .pipe( eslint( { fix: true } ))
    .pipe( eslint.format() )
    .pipe( dest( "./src/scripts/" ));
}

function css() {
  return src( "./src/styles/**/*.scss" )
   .pipe( sourcemaps.init() )
   .pipe( sass( {
     outputStyle: "compressed"
   }).on( "error", sass.logError ))
   .pipe( autoprefixer( {
     browsers: [ "last 2 versions" ],
     cascade: false
   }))
   .pipe( sourcemaps.write( "./" ))
   .pipe( dest( "./build/public/styles/" ));
}

//-------------------
//    Watch tasks
//-------------------
function watchJs() {
  return watch("./src/scripts/**/*.js", series(lint, js));
}

function watchCss() {
  return watch("./src/styles/**/*.scss", css);
}

//---------------
//    Exports
//---------------

exports.watchJs = watchJs;
exports.watchCss = watchCss;
exports.watch = parallel(watchJs, watchCss);

exports.js = series(lint, js);
exports.css = css;
exports.default = parallel(css, js);
