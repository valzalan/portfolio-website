const path = require( "path" );

module.exports = {
  entry: "./src/scripts/index.js",
  output: {
    path: path.resolve( __dirname, "build/public/scripts" ),
    filename: "bundle.js"
  }
};
