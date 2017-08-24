import path from 'path';
import open from 'open';
import express from 'express';
import bodyParser from 'body-parser';

/* eslint-disable no-console */
const port = parseInt(process.env.PORT, 10) || 8000;
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('../server/routes/index')(app);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
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
