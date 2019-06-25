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


app.post('/uploadJSON', upload.single('CSVdata'), (req, res, next) => {
    console.log('CSV upload attempted');
    console.log(req.file);
    fs.readFile(req.file.path, 'utf-8', (err, data) => {
        if (err) {
            res.send('Error while reading file');
        } else {
            const output = method.modelJSON(data);
            console.log(output);
            res.location('localhost:3000/').send(output);
        }
    })
})

app.listen(port, () => console.log(`CSV server listening at local host on port ${port}!`));