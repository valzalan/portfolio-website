const { src, dest, parallel, series, watch } = require('gulp');

//    HTML Minify
const htmlmin = require("gulp-htmlmin");

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
  return src( "./src/scripts/index.js" )
    .pipe( webpackStream(webpackConfig), webpack )
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

function html() {
  return src( "src/index.html" )
    .pipe( htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyJs: true
     }))
    .pipe( dest( "build" ));
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

function watchHtml() {
  return watch("./src/index.html", html);
}

//---------------
//    Exports
//---------------

module.exports = {
  watch: parallel(watchHtml, watchJs, watchCss),

  html: html,
  js: js,
  css: css,
  default: parallel(html, css, js)
};
