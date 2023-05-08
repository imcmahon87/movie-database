const express = require('express');
const db = require('./dbconfig');
const cors = require('cors');

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

app.get('/getMovies', (req, res) => {
    db.query('SELECT * FROM movie', (err, result) => {
        if (err) {
            console.log(err);
        }
    res.send(result);
    });
});

app.get('/api/getFromId/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM movie WHERE MovieID = ?', id,
    (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result)
    });
});

app.listen(PORT, () => {
    console.log('Server is running on ' + PORT);
});