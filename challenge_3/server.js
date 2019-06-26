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
      res.send(`userId is:${userId}`);
    }
  });
});

app.post('/contacts', (req, res) => {
  console.log('/contacts POST request received');
  console.log(req.body);
  models.insertContact(req.body, (err, contactId) => {
    if (err) {
      console.log('Error while posting contact', err);
      res.send();
    } else {
      res.send(`contactId is ${contactId}`);
    }
  });
});

app.post('/billing', (req, res) => {
  console.log('/billing POST request received');
  console.log(req.body);
  models.insertBilling(req.body, (err, billingId) => {
    if (err) {
      console.log('Error while posting billing info', err);
      res.send();
    } else {
      res.send(`billingId is ${billingId}`);
    }
  });
})

app.get('/summary', (req, res) => {
  console.log(req.query);
  models.getAll(req.query, (err, fullData) => {
    if (err) {
      console.log('Error while getting summary data', err);
      res.send();
    } else {
      console.log(fullData);
      res.send(fullData);
    }
  })
})

app.listen(port, () => console.log('Shopping app server listening on port ' + port));