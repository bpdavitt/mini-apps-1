const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./db');

app.use(express.static('client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('Server running')
});

app.post('/games', (req, res) => {
  console.log(req.body);
  db.addGame(req.body, (err, result) => {
    if(err) {
      console.log('Error adding games')
      res.end();
    } else {
      res.send('Games database updated');
    }
  })
})

app.listen(port, () => console.log(`Connect4 server listening on port ${port}!`));