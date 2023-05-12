import React, {useState} from 'react';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import GenreList from './components/GenreList';
import DirectorList from './components/DirectorList';
import './App.css';

function App() {

  const [view, setView] = useState({view: 'list', data: false});

  if (view.view === 'list') {
    return (
      <div>
        <MovieList viewChanger={setView} />
      </div>
    );
  } else if (view.view === 'details') {
    return (
      <div>
        <MovieDetails viewChanger={setView} data={view.data} />
      </div>
    );
  } else if (view.view === 'genre') {
    return (
      <div>
        <GenreList viewchanger={setView} data={view.data} />
      </div>
    );
  } else if (view.view === 'director') {
    return (
      <div>
        <DirectorList viewchanger={setView} data={view.data} />
      </div>
    );
  }
}

export default App;