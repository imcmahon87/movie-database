import React from 'react';

function SQLViewer(props) {

    function toggleSQL() {
        let element = document.getElementById('sqlResults');
        if (element.style.display === 'none') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }

    if (props.query === 'movielist') {
        return (
            <div id="sqlBox">
                <div id="sqlView" onClick={() => {toggleSQL()}}>
                    <p>Click here to show SQL for this query</p>
                </div>
                <div id="sqlResults" style={{display: 'none'}}>
                    <table>
                        <tbody>
                            <tr>
                                <td className="sqlLeft">SELECT</td>
                                <td>Title, ReleaseYear Year, Runtime, Description, MovieID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">FROM</td>
                                <td>movies;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } else if (props.query === 'personlist') {
        return (
            <div id="sqlBox">
                <div id="sqlView" onClick={() => {toggleSQL()}}>
                    <p>Click here to show SQL for this query</p>
                </div>
                <div id="sqlResults" style={{display: 'none'}}>
                    <table>
                        <tbody>
                            <tr>
                                <td className="sqlLeft">SELECT</td>
                                <td>LastName, FirstName, DATE_FORMAT(people.BirthDate, "%M %d, %Y") BirthDate, PersonID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">FROM</td>
                                <td>people;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default SQLViewer;