import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function MovieSearch(props) {
    const [movieData, setMovieData] = useState([{Title: 'Loading'}]); 

    useEffect(() => {
            Axios.get('http://localhost:3002/searchMovies/' + props.data)
            .then((data) => {
            setMovieData(data.data);
            })
    }, [props.data]);

    const viewChanger = props.viewChanger;

    // When a movie name is clicked
    function clickTitle(e) {
      let selection = e.target.id;
      viewChanger({view: 'moviedetails', data: selection});
    }
    
    if (movieData.length === 0) {
        return (
            <div className="wrapper">
                <h2>Movie Search</h2>
                <p>No results found, please try again</p>
            </div>
        );
    } else {
        return (
            <div className="wrapper">
            <h2>Movie Search</h2>
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
}

export default MovieSearch;