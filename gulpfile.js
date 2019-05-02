//---------------
//    Imports
//---------------

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
      argv = require( "yargs" ).argv;

//    Css pre and postprocessing
const sass = require( "gulp-sass" ),
      autoprefixer = require( "gulp-autoprefixer" );

const MODE = ( argv.production === undefined ) ? "development" : "production";

(function setWebpackMode() {
    webpackConfig.mode = MODE;
})();

//-------------
//    Tasks
//-------------

function js(callB) {
    if( MODE == "development" ) {
        return src( "./src/scripts/*.js" )
            .pipe( webpackStream( webpackConfig ), webpack )
            .pipe( sourcemaps.init( { loadMaps: true } ))
            .on( "error", console.error.bind( console ))
            .pipe( sourcemaps.write( "./" ))
            .pipe( dest( "./build/public/scripts/" ));
    } else if( MODE == "production" ) {
        return src( "./src/scripts/*.js" )
            .pipe( webpackStream( webpackConfig ), webpack )
            .pipe( sourcemaps.init( { loadMaps: true } ))
            .pipe( babel({
                presets: ['@babel/env']
            }))
            .pipe( butternut() )
            .on( "error", console.error.bind( console ))
            .pipe( sourcemaps.write( "./" ))
            .pipe( dest( "./build/public/scripts/" ));
    }
    callB(new Error("Unknown MODE"));
}

function css(callB) {
    if( MODE == "development" ) {
        return src( "./src/styles/**/*.scss" )
            .pipe( sourcemaps.init() )
            .pipe( sass()
            .on( "error", sass.logError ))
            .pipe( sourcemaps.write( "./" ))
            .pipe( dest( "./build/public/styles/" ));
    } else if( MODE == "production" ) {
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
    callB(new Error("Unknown MODE"));
}

function html(callB) {
    if ( MODE == "development" ) {
        return src( "src/index.html" )
            .pipe( dest( "build" ));
    } else if ( MODE == "production" ) {
        return src( "src/index.html" )
            .pipe( htmlmin({
                collapseWhitespace: true,
                removeComments: true,
                minifyJs: true
            }))
            .pipe( dest( "build" ));
    }
    callB(new Error("Unknown MODE"));
}

//-------------------
//    Watch tasks
//-------------------

function watchJs() {
    return watch( "./src/scripts/**/*.js", js );
}

function watchCss() {
    return watch( "./src/styles/**/*.scss", css );
}

function watchHtml() {
    return watch( "./src/index.html", html );
}

//---------------
//    Exports
//---------------

module.exports = {
    watch: parallel( watchHtml, watchJs, watchCss ),
    html: html,
    js: js,
    css: css,
    default: parallel( html, css, js )
};
