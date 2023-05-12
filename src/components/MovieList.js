import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function MovieList(props) {
  const [movieData, setMovieData] = useState([{Title: 'Loading'}]);;

  useEffect(() => {
    Axios.get('http://localhost:3002/getAllMovies')
      .then((data) => {
        setMovieData(data.data);
      })
  }, []);

  const viewChanger = props.viewChanger;

  function clickTitle(e) {
    let selection = e.target.id;
    viewChanger({view: 'details', data: selection});
  }

  function clickGenre(e) {
    let selection = e.target.id;
    viewChanger({view: 'genre', data: selection});
  }

  function clickDirector(e) {
    let selection = e.target.id;
    viewChanger({view: 'director', data: selection});
  }

    return (
        <div>
          <h2>All Movies</h2>
            <table>
            <thead>
                <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Director</th>
                </tr>
            </thead>
            <tbody>
                {movieData.map((val, key) => {
                return (
                    <tr key={key}>
                    <td id={val.MovieID} onClick={(e) => {clickTitle(e);}}>{val.Title}</td>
                    <td id={val.Genre} onClick={(e) => {clickGenre(e);}}>{val.Genre}</td>
                    <td id={val.PersonID} onClick={(e) => {clickDirector(e);}}>{val.Director}</td>
                    </tr>
                );
                })}
            </tbody>
            </table>
        </div>
    );
}

export default MovieList;