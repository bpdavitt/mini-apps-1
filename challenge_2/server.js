const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('client'));

app.get('/', (req, res) => {
    res.send('CSV Generator Loading');
});

app.listen(port, () => console.log(`CSV server listening at local host on port ${port}!`));