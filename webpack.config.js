const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const port = 8080;

const outputPath = path.join(__dirname, 'client');


module.exports = {
  devtool: 'inline-sourcemap',
  entry: './src/index.jsx',
  output: {
    path: outputPath,
    filename: 'client/bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!sass-loader',
        }),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      { test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=img/img-[hash:6].[ext]',
      },
    ],
  },
  devServer: {
    port,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('public/bundle.css'),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
    new Dotenv({
      path: './.env',
      safe: false
    })
  ],
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
