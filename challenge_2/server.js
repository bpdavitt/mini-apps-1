const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(express.static('client'));
app.use(bodyParser());

app.get('/', (req, res) => {
    res.send('CSV Generator Loading');
});

app.post('/upload_json', (req, res) => {
    console.log('CSV upload attempted');
    console.log(JSON.parse(req.body.CSVdata));
    res.send('Sorry, we are under construction');
})

app.listen(port, () => console.log(`CSV server listening at local host on port ${port}!`));