import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function PersonList(props) {

    const [movieData, setMovieData] = useState([{LastName: 'Loading'}]);

    const viewChanger = props.viewChanger;

    useEffect(() => {
        Axios.get('http://localhost:3002/getPerson/' + props.data).then((data) => {
            setMovieData(data.data);
        });
    }, [props.data]);

    let directed = [];
    let movieDirected;
    let wrote = [];
    let movieWrote;

    // When a movie title is clicked
    function clickMovie(e) {
        let selection = Number(e.target.id);
        console.log(selection);
        if (selection !== 0) {
            viewChanger({view: 'moviedetails', data: selection});
        }
    }

    function filterDirected() {
        directed = [];
        for (let i = 0; i < movieData.length; i++) {
            if (movieData[i].Directed !== undefined && movieData[i].Directed !== null) {
                movieDirected = { id: movieData[i].dMovieID, title: movieData[i].Directed };
                if (directed.filter(e => e.title === movieDirected.title).length === 0) {
                    directed.push(movieDirected);
                }
            }
        }
        if (directed.length === 0) {
            directed.push({ id: 0, title: 'No data available' });
        }
    }

    function filterWrote() {
        wrote = [];
        for (let i = 0; i < movieData.length; i++) {
            if (movieData[i].Wrote !== undefined && movieData[i].Wrote !== null) {
                movieWrote = { id: movieData[i].wMovieID, title: movieData[i].Wrote };
                if (wrote.filter(e => e.title === movieWrote.title).length === 0) {
                    wrote.push(movieWrote);
                }
            }
        }
        if (wrote.length === 0) {
            wrote.push({ id: 0, title: 'No data available' });
        }
        console.log(wrote);
    }

    return (
        <div>
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
                                <td id={val.id} onClick={(e) => {clickMovie(e)}}>{val.title}</td>
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
                                <td id={val.id} onClick={(e) => {clickMovie(e)}}>{val.title}</td>
                            </tr>   
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default PersonList;