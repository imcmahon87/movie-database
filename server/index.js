const express = require('express');
const db = require('./dbconfig');
const cors = require('cors');

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

app.get('/getAllMovies', (req, res) => {
    db.query('SELECT Title, Genre, PersonName Director, MovieID, PersonID \
              FROM movie \
              JOIN person ON movie.DirectorID = person.PersonID;', (err, result) => {
    if (err) {
        console.log(err);
    }
    res.send(result);
    });
});

app.get('/getMovie/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT Title, Genre, Description, Runtime, PersonName Director, AwardName, Category, Year \
              FROM movie \
              LEFT JOIN person ON movie.DirectorID = person.PersonID \
              LEFT JOIN movieawards on movie.MovieID = movieawards.MovieID \
              WHERE movie.MovieID = ?', id, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

app.get('/getGenre/:genre', (req, res) => {
    const genre = req.params.genre;
    db.query('SELECT Title, PersonName Director, Genre \
              FROM movie \
              JOIN person ON movie.DirectorID = person.PersonID \
              WHERE Genre = ?', genre, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

app.get('/getDirector/:director', (req, res) => {
    const director = req.params.director;
    db.query('SELECT Title, Genre, PersonName Director \
              FROM movie \
              JOIN person ON movie.DirectorID = person.PersonID \
              WHERE PersonID = ?', director, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

app.listen(PORT, () => {
    console.log('Server is running on ' + PORT);
});