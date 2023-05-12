import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function DirectorList(props) {

    const [movieData, setMovieData] = useState([{Director: 'Loading'}]);

    useEffect(() => {
        Axios.get('http://localhost:3002/getDirector/' + props.data).then((data) => {
            setMovieData(data.data);
        });
    }, [props.data]);

    return (
        <div>
            <h2>{movieData[0].Director}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {movieData.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.Title}</td>
                                <td>{val.Genre}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default DirectorList;