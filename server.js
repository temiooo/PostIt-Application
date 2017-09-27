import path from 'path';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api-docs/', express.static(path.join(__dirname, 'server/api-docs/')));

require('./server/routes/index')(app);

app.listen(port, () => {
  
});

export default app;
