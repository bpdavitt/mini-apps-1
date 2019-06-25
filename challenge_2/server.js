const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const method = require('./methods');

app.use(express.static('client'));
app.use(bodyParser());

app.get('/', (req, res) => {
    res.send('CSV Generator Loading');
});

app.post('/upload_json', (req, res) => {
    console.log('CSV upload attempted');
    // console.log(JSON.parse(req.body.CSVdata));
    const output = method.modelJSON(req.body.CSVdata);
    console.log(output);
    res.send(output);
    // res.send('Data received')
})

app.listen(port, () => console.log(`CSV server listening at local host on port ${port}!`));