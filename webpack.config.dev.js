import path from 'path';
import webpack from 'webpack';

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    // necessary for hot reloading with IE
    'eventsource-polyfill',
    // note that it reloads the page if hot module reloading fails.
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'client/src/index.js')
  ],
  target: 'web',
  output: {
    /* Note: Physical files are only output by the
    production build task `npm run build`. */
    path: `${__dirname}/client/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    loaders: [
      { test: /(\.css)$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url?prefix=font/&limit=5000'
      },
    ],
  },
};
