import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import SQLViewer from './SQLViewer';

function PersonList(props) {
    const [movieData, setMovieData] = useState([{Title: 'Loading', Genre: 'Loading', Description: 'Loading',
                                                 MovieID: 'Loading', Name: 'Loading', Runtime: 'Loading',
                                                 Year: 'Loading', FirstName: 'Loading', LastName: 'Data'}]);

    useEffect(() => {
        Axios.get('https://iandeveloper.com:3001/getAllPeople')
        .then((data) => {
            setMovieData(data.data);
        })
        document.getElementById('validationError').innerHTML = '';
    }, []);

    const viewChanger = props.viewChanger;

    // For mapping from array to table entries
    let people = [{name: 'Loading', birthDate: 'Loading'}];
    let person;

    // When a person's name is clicked
    function clickPerson(e) {
        let selection = e.target.id;
        viewChanger({view: 'persondetails', data: selection});
    }

    // Iterate through people and display each one only once
    function filterPeople() {
        people = [];
        for (let i = 0; i < movieData.length; i++) {
            if (movieData[i].PersonID !== null) {
                person = { id: movieData[i].PersonID, name: movieData[i].FirstName + ' ' + movieData[i].LastName, birthDate: movieData[i].BirthDate };
                if (people.filter(e => e.PersonID === person.id).length === 0) {
                    people.push(person);
                }
            }
        }
        if (people.length === 0) {
            people.push({id: 0, name: 'No people data'});
        }
    }

    return (
        <div className="wrapper">
          <SQLViewer query='personlist' />
          <h2>All People</h2>
            <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Birth Date</th>
                </tr>
            </thead>
            <tbody>
                {filterPeople()}
                {people.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td className="clickable" id={val.id} onClick={(e) => {clickPerson(e)}}>{val.name}</td>
                            <td>{val.birthDate}</td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
        </div>
    );
}

export default PersonList;