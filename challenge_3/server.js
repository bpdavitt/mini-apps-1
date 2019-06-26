const express = require('express');
const app = express();
const port = 3000;
const models = require('./models');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser());

app.get('/', (req, res) => {
  res.send('Hello')
});

app.post('/users', (req, res) => {
  console.log('/users POST request received');
  console.log(req.body);
  models.insertUser(req.body, (err, userId) => {
    if (err) {
      console.log('Error while posting user', err);
      res.send();
    } else {
      res.send(`userId is ${userId}`);
    }
  });
});

app.post('/contacts', (req, res) => {

});

app.post('billing', (req, res) => {

})

app.get('/summary', (req, res) => {

})

app.listen(port, () => console.log('Shopping app server listening on port ' + port));