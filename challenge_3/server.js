const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.static('client'));

app.get('/', (req, res) => {
  res.send('Hello')
});

app.listen(port, () => console.log('Shopping app server listening on port ' + port));