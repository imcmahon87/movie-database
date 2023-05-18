import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import SQLViewer from './SQLViewer';

function PersonDetails(props) {
    const [movieData, setMovieData] = useState([{LastName: 'Loading'}]);
    const viewChanger = props.viewChanger;

    useEffect(() => {
        Axios.get('http://localhost:3002/getPerson/' + props.data).then((data) => {
            setMovieData(data.data);
        });
        document.getElementById('validationError').innerHTML = '';
    }, [props.data]);

    // For mapping from array to table entries
    let directed = [];
    let movieDirected;
    let wrote = [];
    let movieWrote;

    // When a movie title is clicked
    function clickMovie(e) {
        let selection = Number(e.target.id);
        if (selection !== 0) {
            viewChanger({view: 'moviedetails', data: selection});
        }
    }

    // Iterate through movies directed and display each one only once
    function filterDirected() {
        directed = [];
        for (let i = 0; i < movieData.length; i++) {
            if (movieData[i].Directed !== undefined && movieData[i].Directed !== null) {
                movieDirected = { id: movieData[i].dMovieID, title: movieData[i].Directed, click: 'clickable' };
                if (directed.filter(e => e.title === movieDirected.title).length === 0) {
                    directed.push(movieDirected);
                }
            }
        }
        if (directed.length === 0) {
            directed.push({ id: 0, title: 'No data available', click: 'nonclickable' });
        }
    }

    // Iterate through movies written and display each one only once
    function filterWrote() {
        wrote = [];
        for (let i = 0; i < movieData.length; i++) {
            if (movieData[i].Wrote !== undefined && movieData[i].Wrote !== null) {
                movieWrote = { id: movieData[i].wMovieID, title: movieData[i].Wrote, click: 'clickable' };
                if (wrote.filter(e => e.title === movieWrote.title).length === 0) {
                    wrote.push(movieWrote);
                }
            }
        }
        if (wrote.length === 0) {
            wrote.push({ id: 0, title: 'No data available', click: 'nonclickable' });
        }
    }

    return (
        <div className="wrapper">
            <SQLViewer query="persondetails" data={props.data} />
            <h2>{movieData[0].FirstName + ' ' + movieData[0].LastName}</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Birth Date</th>
                    </tr>
                    <tr>
                        <td>{movieData[0].BirthDate}</td>
                    </tr>
                    <tr>
                        <th>Movies Directed</th>
                    </tr>
                    {filterDirected()}
                    {directed.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td className={val.click} id={val.id} onClick={(e) => {clickMovie(e)}}>{val.title}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <th>Movies Written</th>
                    </tr>
                    {filterWrote()}
                    {wrote.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td className={val.click} id={val.id} onClick={(e) => {clickMovie(e)}}>{val.title}</td>
                            </tr>   
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default PersonDetails;