import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import SQLViewer from './SQLViewer';

function GenreList(props) {

    const [movieData, setMovieData] = useState([{Title: 'Loading', Genre: 'Loading', Description: 'Loading',
                                                 MovieID: 'Loading', Name: 'Loading', Runtime: 'Loading',
                                                 Year: 'Loading', FirstName: 'Loading', LastName: 'Data'}]);

    const viewChanger = props.viewChanger;

    useEffect(() => {
        Axios.get('https://iandeveloper.com:3001/getGenre/' + props.data).then((data) => {
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
        <div className="wrapper">
            <SQLViewer query="genrelist" data={props.data} />
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