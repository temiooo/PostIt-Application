import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import verifyUser from './middlewares';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(verifyUser).unless({ path: ['/api/user/signup', '/api/user/signin'] });

// Require our routes into the application.
require('./server/routes')(app);

app.listen(5000, () => {
  console.log('app started at port 5000');
});
