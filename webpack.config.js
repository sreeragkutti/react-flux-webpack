"use strict";

const path = require("path");
const isDebug = process.argv.indexOf("development") !== -1;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const TSLintPlugin = require("tslint-webpack-plugin");
const packageJson = require("./package.json");
const vendorDependencies = Object.keys(packageJson["dependencies"]);


let devTool = "";
let minimizerArray = [];

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: "./index.html",
    filename: path.resolve(__dirname, "./build/index.html"),
    minify: {
      removeComments: false,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    },
    inject: true
});

const tsLintPlugin = new TSLintPlugin({
    files: ["./src/**/*.ts", "./src/**/*.tsx"]
});

const terserPlugin = new TerserPlugin(
    {
        terserOptions: {
          warnings: false,
          parse: {},
          compress: {
            sequences: true, // join consecutive statemets with the “comma operator”
            properties: true, // optimize property access: a["foo"] ? a.foo
            dead_code: true, // discard unreachable code
            drop_debugger: true, // discard “debugger” statements
            unsafe: false, // some unsafe optimizations (see below)
            conditionals: true, // optimize if-s and conditional expressions
            comparisons: true, // optimize comparisons
            evaluate: true, // evaluate constant expressions
            booleans: true, // optimize boolean expressions
            loops: true, // optimize loops
            unused: true, // drop unused variables/functions
            hoist_funs: true, // hoist function declarations
            hoist_vars: false, // hoist variable declarations
            if_return: true, // optimize if-s followed by return/continue
            join_vars: true, // join var declarations
            side_effects: true, // drop side-effect-free statements
            warnings: false // warn about potentially dangerous optimizations/code
          },
          sourceMap: true,
          minimize: true,
          mangle: {
            keep_fnames: true
          },
          // minChunks: Infinity,
          output: {
            comments: false
          }
        }
      }
);

// Condition for adding plugins for 
// Debug as well as Development mode
if(isDebug){
    devTool = "source-map";
}
else{
    minimizerArray.push(terserPlugin);
}



module.exports = {
  // Set debugging source maps to be "inline" for
  // simplicity and ease of use
  devtool: devTool,

  // The application entry point
  entry: "./src/index.tsx",

  // Where to compile the bundle
  // By default the output directory is `dist`
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "build/")
  },

  // Supported file loaders
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {  enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

      // All output '.css' files will be handled by style-loader and css-loader
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ]
  },

  // File extensions to support resolving
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },

  // Additional Plugins for the project
  plugins: [
    htmlWebpackPlugin,
    tsLintPlugin,
  ],

  // Other optimization
  optimization: {
    minimizer: minimizerArray,
    splitChunks: {
      chunks: "initial",
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendor: {
          test: new RegExp(
            "/[\\\\/]node_modules[\\\\/](" +
              vendorDependencies.join("|") +
              ")[\\\\/]/"
          )
        },
        default: {
          minChunks: 2,
          reuseExistingChunk: true
        }
      }
    }
  }
};