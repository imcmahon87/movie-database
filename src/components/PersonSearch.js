import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import SQLViewer from './SQLViewer';

function PersonSearch(props) {
    const [movieData, setMovieData] = useState([{Title: 'Loading'}]);;

    useEffect(() => {
        Axios.get('http://localhost:3002/searchPeople/' + props.data)
        .then((data) => {
            setMovieData(data.data);
        })
    }, [props.data]);

    const viewChanger = props.viewChanger;

    // When a person's name is clicked
    function clickPerson(e) {
        let selection = e.target.id;
        viewChanger({view: 'persondetails', data: selection});
    }

    if (movieData.length === 0) {
        return (
            <div className="wrapper">
                <h2>Person Search</h2>
                <p>No results found, please try again</p>
            </div>
        );
    } else {
        return (
            <div className="wrapper">
                <SQLViewer query="personsearch" data={props.data} />
                <h2>Person Search</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Birth Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movieData.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td className="clickable" id={val.PersonID} onClick={(e) => {clickPerson(e)}}>{val.FirstName + ' ' + val.LastName}</td>
                                    <td>{val.BirthDate}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PersonSearch;