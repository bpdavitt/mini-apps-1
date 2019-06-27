const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Server running')
});

app.listen(port, () => console.log(`Connect4 server listening on port ${port}!`));