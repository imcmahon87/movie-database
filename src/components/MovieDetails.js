import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function MovieDetails(props) {
    const [movieData, setMovieData] = useState([{Title: 'Loading'}]);

    useEffect(() => {
        Axios.get('http://localhost:3002/getMovie/' + props.data).then((data) => {
        setMovieData(data.data);
        });
        document.getElementById('validationError').innerHTML = '';
    }, [props.data]);

    // For mapping from array to table entries
    let awards = [];
    let award;
    let directors = [];
    let director;
    let writers = [];
    let writer;
    let genres = [];
    let genre;

    const viewChanger = props.viewChanger;

    // When a person's name is clicked
    function clickPerson(e) {
        let selection = Number(e.target.id);
        if (selection !== 0) {
            viewChanger({view: 'persondetails', data: selection});
        }
    }

    // When a genre is clicked
    function clickGenre(e) {
        let selection = Number(e.target.id);
        if (selection !== 0) {
            viewChanger({view: 'genrelist', data: selection});
        }
    }

    // Iterate through awards and display each one only once
    function filterAwards() {
        for (let i = 0; i < movieData.length; i++) {
            if (movieData[i].Award !== null) {
                award = movieData[i].Award + ' award for ' + movieData[i].Category + ' in ' + movieData[i].AwardYear;
                if (!awards.includes(award)) {
                    awards.push(award);
                }
            }
        }
        if (awards.length === 0) {
            awards.push('No award data');
        }
    }

    // Iterate through directors and display each one only once
    function filterDirectors() {
        directors = [];
        for (let i = 0; i < movieData.length; i++) {
            if (movieData[i].dFirstName !== null) {
                director = { id: movieData[i].DirectorID, name: movieData[i].dFirstName + ' ' + movieData[i].dLastName, click: 'clickable' };
                if (directors.filter(e => e.name === director.name).length === 0) {
                    directors.push(director);
                }
            }
        }
        if (directors.length === 0) {
            directors.push({id: 0, name: 'No director data', click: 'nonclickable'});
        }
    }

    // Iterate through writers and display each one only once
    function filterWriters() {
        writers = [];
        for (let i = 0; i < movieData.length; i++) {
            if (movieData[i].wFirstName !== null) {
                writer = { id: movieData[i].WriterID, name: movieData[i].wFirstName + ' ' + movieData[i].wLastName, click: 'clickable' };
                if (writers.filter(e => e.name === writer.name).length === 0) {
                    writers.push(writer);
                }
            }
        }
        if (writers.length === 0) {
            writers.push({id: 0, name: 'No writer data', click: 'nonclickable'});
        }
    }

    // Iterate through genres and display each one only once
    function filterGenres() {
        genres = [];
        for (let i = 0; i < movieData.length; i++) {
            if (movieData[i].Genre !== null) {
                genre = { id: movieData[i].GenreID, genre: movieData[i].Genre, click: 'clickable' };
                if (genres.filter(e => e.genre === genre.genre).length === 0) {
                    genres.push(genre);
                }
            }
        }
        if (genres.length === 0) {
            genres.push({id: 0, genre: 'No genre data', click: 'nonclickable'});
        }
    }

    return (
        <div>
            <h2>{movieData[0].Title}</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Genre</th>
                    </tr>
                    {filterGenres()}
                    {genres.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td className={val.click} id={val.id} onClick={(e) => {clickGenre(e)}}>{val.genre}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <th>Director</th>
                    </tr>
                    {filterDirectors()}
                    {directors.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td className={val.click} id={val.id} onClick={(e) => {clickPerson(e)}}>{val.name}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <th>Writer</th>
                    </tr>
                    {filterWriters()}
                    {writers.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td className={val.click} id={val.id} onClick={(e) => {clickPerson(e)}}>{val.name}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <th>Description</th>
                    </tr>
                    <tr>
                        <td>{movieData[0].Description}</td>
                    </tr>
                    <tr>
                        <th>Runtime</th>
                    </tr>
                    <tr>
                        <td>{movieData[0].Runtime} minutes</td>
                    </tr>
                    <tr>
                        <th>Awards</th>
                    </tr>
                    {filterAwards()}
                    {awards.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default MovieDetails;