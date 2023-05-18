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
                                <td>Movies</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">ORDER BY</td>
                                <td>Title;</td>
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
                                <td>LastName, FirstName, DATE_FORMAT(People.BirthDate, "%M %d, %Y") BirthDate, PersonID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">FROM</td>
                                <td>People</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">ORDER BY</td>
                                <td>LastName;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    } else if (props.query === 'Moviesearch') {
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
                                <td>Movies</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">WHERE</td>
                                <td>Title LIKE '%{props.data}%'</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">ORDER BY</td>
                                <td>Title;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    } else if (props.query === 'personsearch') {
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
                                <td>LastName, FirstName, DATE_FORMAT(People.BirthDate, "%M %d, %Y") BirthDate, PersonID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">FROM</td>
                                <td>People</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">WHERE</td>
                                <td>LastName LIKE '%{props.data}%'</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">OR</td>
                                <td>FirstName LIKE '%{props.data}%'</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">ORDER BY</td>
                                <td>LastName;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    } else if (props.query === 'moviedetails') {
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
                                <td>
                                    Title, Description, Movies.MovieID, Movies.ReleaseYear, Runtime,
		                            p1.LastName dLastName, p1.FirstName dFirstName, p1.PersonID DirectorID,
                                    p2.LastName wLastName, p2.FirstName wFirstName, p2.PersonID WriterID,
                                    Awards.MovieAward Award, Movies_Awards.Category,
                                    Movies_Awards.Year AwardYear, Genres.Genre Genre, Genres.GenreID GenreID
                                </td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">FROM</td>
                                <td>Movies</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">LEFT JOIN</td>
                                <td>Movies_Directors ON Movies_Directors.MovieID = Movies.MovieID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">LEFT JOIN</td>
                                <td>People AS p1 ON p1.PersonID = Movies_Directors.PersonID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">LEFT JOIN</td>
                                <td>Movies_Writers ON Movies_Writers.MovieID = Movies.MovieID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">LEFT JOIN</td>
                                <td>People AS p2 ON p2.PersonID = Movies_Writers.PersonID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">LEFT JOIN</td>
                                <td>Movies_Awards ON Movies_Awards.MovieID = Movies.MovieID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">LEFT JOIN</td>
                                <td>Awards ON Awards.MovieAwardID = Movies_Awards.MovieAwardID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">LEFT JOIN</td>
                                <td>Movies_Genres ON Movies_Genres.MovieID = Movies.MovieID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">LEFT JOIN</td>
                                <td>Genres ON Genres.GenreID = Movies_Genres.GenreID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">WHERE</td>
                                <td>Movies.MovieID = {props.data};</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    } else if (props.query === 'persondetails') {
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
                                <td>
                                    LastName, FirstName, DATE_FORMAT(People.BirthDate, "%M %d, %Y") BirthDate,
		                            m1.Title Directed, m2.Title Wrote, m1.MovieID MovieID
                                </td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">FROM</td>
                                <td>People</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">LEFT JOIN</td>
                                <td>Movies_Directors ON Movies_Directors.PersonID = People.PersonID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">LEFT JOIN</td>
                                <td>Movies AS m1 ON m1.MovieID = Movies_Directors.MovieID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">LEFT JOIN</td>
                                <td>Movies_Writers ON Movies_Writers.PersonID = People.PersonID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">LEFT JOIN</td>
                                <td>Movies AS m2 ON m2.MovieID = Movies_Writers.MovieID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">WHERE</td>
                                <td>People.PersonID = {props.data};</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    } else if (props.query === 'genrelist') {
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
                                <td>Title, Description, Movies.MovieID, Genres.GenreID GenreID, Genres.Genre Genre</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">FROM</td>
                                <td>Movies</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">LEFT JOIN</td>
                                <td>Movies_Genres ON Movies_Genres.MovieID = Movies.MovieID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">LEFT JOIN</td>
                                <td>Genres ON Genres.GenreID = Movies_Genres.GenreID</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">WHERE</td>
                                <td>Genres.GenreID = {props.data}</td>
                            </tr>
                            <tr>
                                <td className="sqlLeft">ORDER BY</td>
                                <td>Title;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default SQLViewer;