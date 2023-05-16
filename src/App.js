import React, {useState, useEffect} from 'react';
import DataViews from './components/DataViews';
import './App.css';

function App() {

    const [view, setView] = useState('movielist');
    const [search, setSearch] = useState('');

    function validateInput(input) {
      if (input.match(/^[0-9a-z]+$/)) {
        return true;
      } else {
        return false;
      }
    }

    function searchMovies() {
        let searchWord = document.getElementById('inputSearch').value;
        let errorSpan = document.getElementById('validationError');
        let inputValid = validateInput(searchWord);
        if (inputValid) {
          setSearch(searchWord);
          setView('moviesearch');
          errorSpan.innerHTML = '';
        } else {
          errorSpan.innerHTML = 'Error: Please enter only letters and numbers';
        }
    }

    function searchPeople() {
      let searchWord = document.getElementById('inputSearch').value;
      let errorSpan = document.getElementById('validationError');
      let inputValid = validateInput(searchWord);
        if (inputValid) {
          setSearch(searchWord);
          setView('personsearch');
          errorSpan.innerHTML = '';
        } else {
          errorSpan.innerHTML = 'Error: Please enter only letters and numbers';
        }
  }

    function onSubmit(event) {
      event.preventDefault();
      let searchWhat = document.getElementById('searchWhat').value;
      if (searchWhat === 'movieTitle') {
        searchMovies();
      } else {
        searchPeople();
      }
    }

    return (
      <div className="wrapper">
        <h1>Movie and Crew Database</h1>
        <h3>Search Keyword</h3>
        <form id="searchForm" onSubmit={(e) => {onSubmit(e)}}>
          <select name="searchWhat" id="searchWhat">
            <option value="movieTitle">Movie Titles</option>
            <option value="people">Directors/Writers</option>
          </select>
          <input id="inputSearch" type="text" />
          <input className="buttonView" type="submit" value="Submit" />
          <span id="validationError"></span>
        </form>
        <div className="buttonHolder">
        <div className="buttonView" onClick={() => {setView('movielist')}}>
          <p>View All Movies</p>
        </div>
        <div className="buttonView" onClick={() => {setView('personlist')}}>
          <p>View All People</p>
        </div>
      </div>
      <DataViews view={view} viewChanger={setView} data={search} />
    </div>
    );

}

export default App;