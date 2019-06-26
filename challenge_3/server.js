const express = require('express');
const app = express();
const port = 3000;
// const db = require('./db');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello')
});

app.listen(port, () => console.log('Shopping app server listening on port ' + port));