var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './src/client');

const config = {
   entry: {
     main: APP_DIR + '/index.js'
   },
   output: {
     filename: 'bundle.js',
     path: BUILD_DIR,
     publicPath:'/',
   },
   module: {
    rules: [
     {test: /\.css$/,loader: 'style-loader!css-loader'},
     {test: /\.(png|woff|woff2|eot|ttf|svg)$/,loader: 'url-loader?limit=100000'},
     {
       test: /\.(jsx|js)?$/,
       use: [{
         loader: "babel-loader",
         options: {
           cacheDirectory: true,
           presets: ['react', 'es2015','stage-0','env'] // Transpiles JSX and ES6
         }
       }]
     }
    ],
  },
  devServer:{
    historyApiFallback: true,
  },

};

module.exports = config;
