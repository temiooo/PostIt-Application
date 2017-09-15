import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

// Get an instance of express
const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;

// Allow app to use logger and bodyparser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
require('./server/routes/index')(app);

// Start the server and listen at port
app.listen(port, () => {
  console.log('app started at port', port);
});

export default app;
