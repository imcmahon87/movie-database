import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import SQLViewer from './SQLViewer';

function MovieList(props) {
    const [movieData, setMovieData] = useState([{Title: 'Loading', Genre: 'Loading', Description: 'Loading',
                                                 MovieID: 'Loading', Name: 'Loading', Runtime: 'Loading',
                                                 Year: 'Loading', FirstName: 'Loading', LastName: 'Data'}]);

    //let movieData2 = [{MovieID: 1, Title: 'Test', Description: 'Another', Year: 2000, Runtime: 100}, {MovieID: 2, Title: 'Another test', Description: 'Description', Year: 2010, Runtime: 110}];

    useEffect(() => {
      Axios.get('https://iandeveloper.com:3001/getAllMovies')
        .then((data) => {
          setMovieData(data.data);
        })
      document.getElementById('validationError').innerHTML = '';
    }, []);

    const viewChanger = props.viewChanger;

    // When a movie name is clicked
    function clickTitle(e) {
      let selection = e.target.id;
      viewChanger({view: 'moviedetails', data: selection});
    }

    return (
        <div className="wrapper">
          <SQLViewer query='movielist' />
          <h2>All Movies</h2>
            <table>
            <thead>
                <tr>
                  <th className="columnTitle">Title</th>
                  <th className="columnDescription">Description</th>
                  <th className="columnYear">Year</th>
                  <th className="columnRuntime">Runtime</th>
                </tr>
            </thead>
            <tbody>
                {movieData.map((val, key) => {
                return (
                    <tr key={key}>
                    <td className="columnTitle clickable" id={val.MovieID} onClick={(e) => {clickTitle(e);}}>{val.Title}</td>
                    <td className="columnDescription">{val.Description}</td>
                    <td className="columnYear">{val.Year}</td>
                    <td className="columnRuntime">{val.Runtime} minutes</td>
                    </tr>
                );
                })}
            </tbody>
            </table>
        </div>
    );
}

export default MovieList;