import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import logger from 'morgan';
import bodyParser from 'body-parser';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 8000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('../server/routes')(app);

// Start the server and listen at port
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
    console.log('app started at port', port);
  }
});
