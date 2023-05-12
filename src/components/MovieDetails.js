import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function MovieDetails(props) {
  const [movieData, setMovieData] = useState([{Title: 'Loading'}]);

  useEffect(() => {
    Axios.get('http://localhost:3002/getMovie/' + props.data).then((data) => {
      setMovieData(data.data);
    });
  }, [props.data]);

    return (
        <div>
            <h2>{movieData[0].Title}</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Genre</th>
                    </tr>
                        <td>{movieData[0].Genre}</td>
                    <tr>
                        <th>Director</th>
                    </tr>
                    <tr>
                        <td>{movieData[0].Director}</td>
                    </tr>
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
                    {movieData.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.AwardName} award for {val.Category} in {val.Year}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default MovieDetails;