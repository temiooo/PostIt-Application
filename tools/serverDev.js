import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import logger from 'morgan';
import bodyParser from 'body-parser';
import config from '../webpack.config.dev';
// import userRoutes from '../server/routes/user';
// import groupRoutes from '../server/routes/group';
/* eslint-disable no-console */

const port = parseInt(process.env.PORT, 10) || 8000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, '../client/src')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('../server/routes/index')(app);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});


// Start the server and listen at port
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
    console.log('app started at port', port);
  }
});
