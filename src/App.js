import React, {useState} from 'react';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import GenreList from './components/GenreList';
import PersonDetails from './components/PersonDetails';
import './App.css';

function App() {

  const [view, setView] = useState({view: 'movielist', data: false});

  if (view.view === 'movielist') {
    return (
      <div>
        <MovieList view="view" viewChanger={setView} />
      </div>
    );
  } else if (view.view === 'moviedetails') {
    return (
      <div>
        <MovieDetails view="view" viewChanger={setView} data={view.data} />
      </div>
    );
  } else if (view.view === 'genrelist') {
    return (
      <div>
        <GenreList view="view" viewChanger={setView} data={view.data} />
      </div>
    );
  } else if (view.view === 'persondetails') {
    return (
      <div>
        <PersonDetails view="view" viewChanger={setView} data={view.data} />
      </div>
    );
  }
}

export default App;