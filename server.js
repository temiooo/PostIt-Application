import path from 'path';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes';

const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api-docs/', express.static(path.join(__dirname, 'server/api-docs/')));

routes(app);

app.get('/*', (req, res) => {
  res.status(404).send({
    message: 'This page does not exist'
  });
});

app.listen(port);

export default app;
