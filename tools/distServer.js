import path from 'path';
import open from 'open';
import logger from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import routes from '../server/routes';

/* eslint-disable no-console */
const port = parseInt(process.env.PORT, 10) || 5000;
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api-docs',
  express.static(path.join(__dirname, '../server/api-docs')));

routes(app);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
    console.log('app started at port', port);
  }
});
