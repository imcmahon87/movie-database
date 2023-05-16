const express = require('express');
const db = require('./dbconfig');
const cors = require('cors');

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

app.get('/getAllMovies', (req, res) => {
    db.query('SELECT    Title, ReleaseYear Year, Runtime, Description, MovieID \
                        FROM movies;', (err, result) => {
    if (err) {
        console.log(err);
    }
    res.send(result);
    });
});

app.get('/searchMovies/:search', (req, res) => {
    const search = '%' + req.params.search + '%';
    db.query('SELECT    Title, ReleaseYear Year, Runtime, Description, MovieID \
                        FROM movies \
                        WHERE Title LIKE ?;', search, (err, result) => {
    if (err) {
        console.log(err);
    }
    res.send(result);
    });
});

app.get('/getAllPeople', (req, res) => {
    db.query('SELECT	LastName, FirstName, DATE_FORMAT(people.BirthDate, "%M %d, %Y") BirthDate, PersonID \
              FROM	    people;', (err, result) => {
    if (err) {
        console.log(err);
    }
    res.send(result);
    });
});

app.get('/searchPeople/:search', (req, res) => {
    const search = '%' + req.params.search + '%';
    db.query('SELECT    LastName, FirstName, DATE_FORMAT(people.BirthDate, "%M %d, %Y") BirthDate, PersonID \
              FROM      people \
              WHERE     LastName LIKE ? \
              OR        FirstName LIKE ?;', [search, search], (err, result) => {
    if (err) {
        console.log(err);
    }
    res.send(result);
    });
});

app.get('/getMovie/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT    	Title, Description, movies.MovieID, movies.ReleaseYear, Runtime, \
                            p1.LastName dLastName, p1.FirstName dFirstName, p1.PersonID DirectorID, \
                            p2.LastName wLastName, p2.FirstName wFirstName, p2.PersonID WriterID, \
                            movieawards.MovieAward Award, movies_movieawards.Category, \
                            movies_movieawards.Year AwardYear, genres.Genre Genre, genres.GenreID GenreID \
                FROM    	movies \
                LEFT JOIN	movies_directors ON movies_directors.MovieID = movies.MovieID \
                LEFT JOIN	people AS p1 ON p1.PersonID = movies_directors.PersonID \
                LEFT JOIN	movies_writers ON movies_writers.MovieID = movies.MovieID \
                LEFT JOIN	people AS p2 ON p2.PersonID = movies_writers.PersonID \
                LEFT JOIN	movies_movieawards ON movies_movieawards.MovieID = movies.MovieID \
                LEFT JOIN	movieawards ON movieawards.MovieAwardID = movies_movieawards.MovieAwardID \
                LEFT JOIN	movies_genres ON movies_genres.MovieID = movies.MovieID \
                LEFT JOIN	genres ON genres.GenreID = movies_genres.GenreID \
                WHERE	    movies.MovieID = ?;', id, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

app.get('/getGenre/:genre', (req, res) => {
    const genre = req.params.genre;
    db.query('SELECT	Title, Description, movies.MovieID, genres.GenreID GenreID, genres.Genre Genre \
              FROM		movies \
              LEFT JOIN	movies_genres ON movies_genres.MovieID = movies.MovieID \
              LEFT JOIN	genres ON genres.GenreID = movies_genres.GenreID \
              WHERE		genres.GenreID = ?;', genre, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

app.get('/getPerson/:person', (req, res) => {
    const person = req.params.person;
    db.query('SELECT		LastName, FirstName, DATE_FORMAT(people.BirthDate, "%M %d, %Y") BirthDate, m1.Title Directed, m2.Title Wrote, m1.MovieID dMovieID, m2.MovieID wMovieID \
                            FROM		people \
                            LEFT JOIN	movies_directors ON movies_directors.PersonID = people.PersonID \
                            LEFT JOIN	movies AS m1 ON m1.MovieID = movies_directors.MovieID \
                            LEFT JOIN	movies_writers ON movies_writers.PersonID = people.PersonID \
                            LEFT JOIN	movies AS m2 ON m2.MovieID = movies_writers.MovieID \
                            WHERE		people.PersonID = ?;', person, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

app.listen(PORT, () => {
    console.log('Server is running on ' + PORT);
});