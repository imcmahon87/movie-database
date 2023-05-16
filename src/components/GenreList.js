import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function GenreList(props) {

    const [movieData, setMovieData] = useState([{Title: 'Loading'}]);

    const viewChanger = props.viewChanger;

    useEffect(() => {
        Axios.get('http://localhost:3002/getGenre/' + props.data).then((data) => {
            setMovieData(data.data);
        });
        document.getElementById('validationError').innerHTML = '';
    }, [props.data]);

    // When a movie title is clicked
    function clickMovie(e) {
        let selection = Number(e.target.id);
        if (selection !== 0) {
            viewChanger({view: 'moviedetails', data: selection});
        }
    }

    return (
        <div>
            <h2>{movieData[0].Genre}</h2>
            <table>
                <thead>
                    <tr>
                        <th className="columnTitle">Title</th>
                        <th className="columnDescription">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {movieData.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td className="columnTitle clickable" id={val.MovieID} onClick={(e) => {clickMovie(e)}}>{val.Title}</td>
                                <td className="columnDescription">{val.Description}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default GenreList;