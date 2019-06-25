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

app.post('/', (req, res) => {
    console.log('CSV upload attempted');
    // console.log(JSON.parse(req.body.CSVdata));
    const output = method.modelJSON(req.body.CSVdata);
    console.log(output);
    res.location('localhost:3000/').send(`
    <!DOCTYPE html>

    <html>
    <head>
        <title>CSV Report Generator</title>
        <link rel="stylesheet" type="text/css" href="style.css">
        <style>.CSVoutput{white-space: pre-wrap} </style>
    </head>

    <body>
        <h1>Enter CSV Report</h1>
        <form action="/" method="post">
            <label for="POST-CSV">Paste CSV Data Here:</label>
            <input type="text" name="CSVdata" id="POST-CSV" required>
            <input type="submit" value="Submit">
        </form>
        <div class="CSVoutput">${output}</div>

        <script type ="text/javascript" src="./app.js"></script>
    </body>
    </html>
    `)
})

app.listen(port, () => console.log(`CSV server listening at local host on port ${port}!`));