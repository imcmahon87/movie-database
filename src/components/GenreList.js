import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function GenreList(props) {

    const [movieData, setMovieData] = useState([{Title: 'Loading'}]);

    useEffect(() => {
        Axios.get('http://localhost:3002/getGenre/' + props.data).then((data) => {
            setMovieData(data.data);
        });
    }, [props.data]);

    return (
        <div>
            <h2>{props.data}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Director</th>
                    </tr>
                </thead>
                <tbody>
                    {movieData.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.Title}</td>
                                <td>{val.Director}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default GenreList;