const express = require('express');
const cors = require('cors');
const mongo = require('./db/mongo');
const getRandomQuote = require('./routes/randomQuote');
const getQod = require('./routes/qod');
const getIod = require('./routes/iod');
const { addImagesToDb } = require('./lib/utils');

const app = express();
const port = process.env.PORT || 3000;

// console.log(process.env);

mongo.mongoConnect();

app.use(cors());

app.use(express.static('assets'));
app.use('/api/randomquote', getRandomQuote);
app.use('/api/qod', getQod);
app.use('/api/iod', getIod);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

setInterval(addImagesToDb, 300000);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
