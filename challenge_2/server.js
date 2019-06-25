const express = require('express');
const app = express();
const port = 3000;
const method = require('./methods');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


app.use(express.static('client'));


app.get('/', (req, res) => {
    res.send('CSV Generator Loading');
});

// FUTURE WORK: Multer should be able to deal w/ text or null file as well


app.post('/', upload.single('CSVdata'), (req, res, next) => {
    console.log('CSV upload attempted');
    console.log(req.file);
    fs.readFile(req.file.path, 'utf-8', (err, data) => {
        if (err) {
            res.send('Error while reading file');
        } else {
            const output = method.modelJSON(data);
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
                    <form action="/" method="post" enctype="multipart/form-data">
                        <label for="POST-CSV">Paste CSV Data Here:</label>
                        <input type="file" name="CSVdata" id="POST-CSV" required>                        
                        <input type="submit" value="Submit">
                    </form>
                    <div class="CSVoutput">${output}</div>

                    <script type ="text/javascript" src="./app.js"></script>
                </body>
                </html>`
            )
        }
    })
    // res.send('Halp');
    // console.log(JSON.parse(req.body.CSVdata));
    // const output = method.modelJSON(req.body.CSVdata);
    // console.log(output);
    // res.location('localhost:3000/').send(`
    // <!DOCTYPE html>

    // <html>
    // <head>
    //     <title>CSV Report Generator</title>
    //     <link rel="stylesheet" type="text/css" href="style.css">
    //     <style>.CSVoutput{white-space: pre-wrap} </style>
    // </head>

    // <body>
    //     <h1>Enter CSV Report</h1>
    //     <form action="/" method="post">
    //         <label for="POST-CSV">Paste CSV Data Here:</label>
    //         <input type="text" name="CSVdata" id="POST-CSV" required>
    //         <input type="submit" value="Submit">
    //     </form>
    //     <div class="CSVoutput">${output}</div>

    //     <script type ="text/javascript" src="./app.js"></script>
    // </body>
    // </html>
    // `)
})

app.listen(port, () => console.log(`CSV server listening at local host on port ${port}!`));